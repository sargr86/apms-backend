const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        // unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        // required: true,
    },
    first_name:{
        type: String,
        required: true,
    },
    last_name:{
        type: String,
        required: true,
    }
});
const User = mongoose.model('users', UserSchema);
module.exports = User;
