var userModel = require('../models/userModel')
const bcrypt = require('bcryptjs');
const tokenGenerator = require('../utils/tokenGenerator');

module.exports.signup = async function (req, res, next) {
    const { username, password, email } = req.body
    let exists = await userModel.findOne({ email })
    if (exists) {
        req.flash('error', 'You already have an account');
        res.redirect('/')
        return
    }
    if (username != '' && password != '' && email != '') {
        try {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, async (err, hash) => {
                    let data = await userModel.create({
                        username,
                        password: hash,
                        email
                    })
                    const token = tokenGenerator(data)
                    res.cookie('token', token)
                    res.redirect('/setup')
                })
            })
        } catch (error) {
            req.flash('error', error)
            res, redirect('/')
        }
    } else {
        req.flash('error', 'Fill the Details you dumb!!')
        res.redirect('/')
    }
}

module.exports.login = async function (req, res, next) {
    const { username, password } = req.body
    let user = await userModel.findOne({ username })
    if (!user) {
        req.flash('error', 'Invalid username or password');
        res.redirect('/')
        return
    }
    bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
            const token = tokenGenerator(user)
            res.cookie('token', token)
            res.redirect('/home')
        } else {
            req.flash('error', 'wrong credentials');
            res.redirect('/')
        }
    })

}

module.exports.logout = function (req, res) {
    res.cookie('token', '')
    res.redirect('/')
}