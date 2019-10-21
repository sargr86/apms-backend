const mongoose = require('mongoose');
const RolesSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },

});
const Roles = mongoose.model('Roles', RolesSchema);
module.exports = Roles;
