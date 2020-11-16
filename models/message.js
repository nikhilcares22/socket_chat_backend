const mongoose = require('mongoose');
const chatSchema = new mongoose.Schema({
    message: {
        type: String,
    },
    sender: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    receiver: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
});

module.exports = mongoose.model('Chat', chatSchema)