const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CompanySchema = new Schema({
    companyName: {
        type: String,
        required: true,
        unique: true
    },
    number: {
        type: Number,
        required: true
    },
    fax: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type:String,
        required: true
    }
});

module.exports =mongoose.model('company', CompanySchema)



