var express = require('express');
var router = express.Router();
var userModel = require('../models/userModel')
var postModel = require('../models/postModel')
const upload = require('../configs/multer')
const dayJs = require('dayjs')
const { signup, login, logout } = require('../controllers/authController');
const isLoggedIn = require('../controllers/isLoggedIn');
const { closeDelimiter } = require('ejs');

router.get('/', function (req, res, next) {
  let error = req.flash('error');
  res.render('index', { error });
})


router.get('/home', isLoggedIn, async function (req, res, next) {
  // let url = 'https://newsapi.org/v2/everything?q=keyword&apiKey=6947e50511f340feba0d0b9a0cad0e93'
  // let resp = await fetch(url)
  // let data = await resp.json()
  // var num = Math.floor(Math.random() * 100) + 1;

  let posts = await postModel.find().populate('user')

  let user = req.user
  res.render('home', { user, posts, dayJs });
})

router.get('/setup', isLoggedIn, function (req, res, next) {
  res.render('profileSetup');
})

router.get('/profile', isLoggedIn, async function (req, res, next) {
  let user = await userModel.findOne({ email: req.user.email }).populate('posts')
  res.render('profile', { user });
})

router.get('/profile/:id', isLoggedIn, async function (req, res, next) {
  let currentUser = req.user
  if (req.user._id.toString() === req.params.id) {
    res.redirect('/profile')
  } else {
    let user = await userModel.findOne({ _id: req.params.id }).populate('posts')
    res.render('userProfile', { user, currentUser });
  }
})
router.get('/follow/:id', isLoggedIn, async function (req, res, next) {
  let currentUser = req.user
  let user = await userModel.findOne({ _id: req.params.id })
  const currentUserId = currentUser._id.toString();
  const userId = user._id.toString();

  const followerIndex = user.followers.map(id => id.toString()).indexOf(currentUserId);
  const followingIndex = currentUser.followings.map(id => id.toString()).indexOf(userId);

  if (followerIndex === -1) {
    // Not following, so follow
    user.followers.push(currentUser._id);
    currentUser.followings.push(user._id);
  } else {
    // Already following, so unfollow
    user.followers.splice(followerIndex, 1);
    currentUser.followings.splice(followingIndex, 1);
  }

  await user.save();
  await currentUser.save();

  res.redirect(`/profile/${req.params.id}`);

})
router.get('/like/:id', isLoggedIn, async function (req, res, next) {
  let user = req.user
  let post = await postModel.findOne({ _id: req.params.id })
  if (post.likes.indexOf(user._id) === -1) {
    post.likes.push(user._id)
    await post.save()
  } else {
    post.likes.splice(post.likes.indexOf(user._id), 1)
    await post.save()
  }
  res.redirect('/home')
})
router.get('/save/:id', isLoggedIn, async function (req, res, next) {
  let user = req.user
  let post = await postModel.findOne({ _id: req.params.id })
  if (user.saves.indexOf(post._id) === -1) {
    user.saves.push(post._id)
  } else {
    user.saves.splice(user.saves.indexOf(post._id), 1)
  }
  await user.save()
  res.redirect('/home')
})

// router.get('/check/:id', isLoggedIn, async function (req, res, next) {
//   let user = req.user

// })





router.get('/edit', isLoggedIn, function (req, res, next) {
  res.render('editProfile', { user: req.user });
})

router.get('/save', isLoggedIn, async function (req, res, next) {
  let user = await userModel.findOne({ email: req.user.email }).populate('saves')
  console.log(user.saves)
  res.render('savedPosts', { user });
})

router.post('/profile-setup', isLoggedIn, upload.array('profile', 2), async function (req, res, next) {
  const { name, bio } = req.body;
  let user = req.user
  user.name = name
  user.bio = bio
  user.pfp = req.files[0].buffer
  user.coverPhoto = req.files[1].buffer
  await user.save()
  res.redirect('home')
})

router.post('/editProfile', isLoggedIn, upload.single('profile'), async function (req, res, next) {
  let user = req.user
  const { username, name, bio } = req.body;
  console.log(req.body)
  if (req.file) {
    user.pfp = req.file.buffer
  }
  user.name = name
  user.bio = bio
  user.username = username
  await user.save()
  res.redirect('profile')
})

router.post('/mediaupload', isLoggedIn, upload.single('media'), async function (req, res, next) {
  let user = req.user
  let post = await postModel.create({
    user: req.user._id,
    caption: req.body.caption,
    // media: req.file.buffer.toString('base64')
  })
  if (req.file) {
    post.media = req.file.buffer.toString('base64')
  }
  await post.save()
  user.posts.push(post._id)
  await user.save()
  res.redirect('home')
});



router.post('/signup', signup);

router.post('/signin', login);

router.get('/logout', logout);



module.exports = router;
