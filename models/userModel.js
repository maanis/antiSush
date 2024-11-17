const mongoose = require('mongoose');

const userModel = mongoose.Schema({
    name: String,
    username: String,
    bio: String,
    email: String,
    password: String,
    created_at: Date,
    pfp: Buffer,
    coverPhoto: Buffer,
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    ],
    followings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    ],
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'post'
        }
    ],
    saves: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'post'
        }
    ]
})

module.exports = mongoose.model('user', userModel);