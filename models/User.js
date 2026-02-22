const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide a username']
    }
});

module.exports = mongoose.model('User', UserSchema);