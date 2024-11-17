var express = require('express');
var router = express.Router();
var userModel = require('../models/userModel')
const upload = require('../configs/multer')
const { signup, login, logout } = require('../controllers/authController');
const isLoggedIn = require('../controllers/isLoggedIn');
const { closeDelimiter } = require('ejs');

router.get('/', function (req, res, next) {
  let error = req.flash('error');
  res.render('index', { error });
})


router.get('/home', isLoggedIn, async function (req, res, next) {
  let url = 'https://newsapi.org/v2/everything?q=keyword&apiKey=6947e50511f340feba0d0b9a0cad0e93'
  let resp = await fetch(url)
  let data = await resp.json()
  var num = Math.floor(Math.random() * 100) + 1;


  let user = req.user
  res.render('home', { user, data: data.articles[num] });
})

router.get('/setup', isLoggedIn, function (req, res, next) {
  res.render('profileSetup');
})

router.get('/profile', isLoggedIn, function (req, res, next) {
  res.render('profile', { user: req.user });
})

router.get('/edit', isLoggedIn, function (req, res, next) {
  res.render('editProfile', { user: req.user });
})

router.get('/save', isLoggedIn, function (req, res, next) {
  res.render('savedPosts');
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
  const { username, name, bio } = req.body;
  console.log(req.body)
  if (req.file) {
    user.pfp = req.file.buffer
  }
  let user = req.user
  user.name = name
  user.bio = bio
  user.username = username
  await user.save()
  res.redirect('profile')
})



router.post('/signup', signup);

router.post('/signin', login);

router.get('/logout', logout);



module.exports = router;
