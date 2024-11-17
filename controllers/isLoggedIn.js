const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel')

const isLoggedIn = async (req, res, next) => {
    let token = req.cookies.token
    if (!token) {
        req.flash('error', 'Login or SignUp first')
        res.redirect('/')
        return
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    let user = await userModel.findOne({ email: decoded.email })
    req.user = user
    next()
}

module.exports = isLoggedIn