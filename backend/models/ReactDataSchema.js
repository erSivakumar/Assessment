const mongoose = require('mongoose');

const ReactFormDataSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', ReactFormDataSchema);
module.exports = User;