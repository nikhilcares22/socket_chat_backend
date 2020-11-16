const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: { type: String },
    socket_id: { type: String },
    isActive: { type: Boolean }
});

module.exports = mongoose.model('User', userSchema)