const mongoose = require('mongoose');

const postModel = mongoose.Schema({
    content: String,
    media: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
    ],
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            },
            content: String
        },
    ],
    
})

module.exports = mongoose.model('post', postModel);