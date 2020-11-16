const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/chat';

const connect = mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false }, () => { console.log('connected to db'); });
module.exports = connect;