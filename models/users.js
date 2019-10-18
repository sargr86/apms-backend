const mongoose = require('mongoose');
const UserSchema =new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
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

const users = mongoose.model('users', UserSchema);
module.exports = users;