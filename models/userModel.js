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
    followers: {
        type: Number,
        default: 0
    },
    followings: {
        type: Number,
        default: 0
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'post'
        }
    ]
})

module.exports = mongoose.model('user', userModel);