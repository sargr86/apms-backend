const Post = require('../models/company');
const http = require('http');



// Express Validator
const {validationResult} = require('express-validator');







//CREATE
// module.exports.create = async (req,res) => {
//     console.log(req.body);
//     let data = [];
//     data.push(JSON.stringify(req.body))
//     console.log(data);
//     let company = await Post.create({
//         name: data.name
//     });
//     res.status(201).json(company);
// }


module.exports.create = async (req,res) => {
    console.log(req.body, 'yhynregh');
    let post = await Post.create({
        companyName: req.body.companyName,
        number: req.body.number,
        fax: req.body.fax,
        city: req.body.city,
        address: req.body.address,
    });
    res.status(201).json(post);
};
