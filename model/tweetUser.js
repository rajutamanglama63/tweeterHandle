const mongoose = require("mongoose");

const tweetUserSchema = new mongoose.Schema({
    first: {
        type: String,
        required: true
    },
    last: {
        type: String,
        required: true
    },
    handle: {
        type: String,
        required: true
    }
})

const tweetUser = mongoose.model('tweetuser', tweetUserSchema);

module.exports = tweetUser;