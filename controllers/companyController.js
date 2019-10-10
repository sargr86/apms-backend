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

module.exports.getAll = async (req,res)=>{
    try{
        let post = await Post.find({});
        res.status(200).json({
            success: true,
            posts:post
        })
    }
    catch (e) {
        res.status(500).json({
            error: e
        })
    }
};


module.exports.create = async (req,res) => {


    // Getting validation result from express-validator
    const errors = validationResult(req);

    // Handling database connection error
    if (!errors.isEmpty()) {
        let singleError = errors.array()[0];
        if (singleError.hasOwnProperty('msg') && singleError.msg.includes('ECONNREFUSED 127.0.0.1:3306')) {
            singleError = 'Please check db connection';
            return res.status(422).json({db_error: singleError});
        } else return res.status(422).json(singleError);
    }


    let post = await Post.create({
        companyName: req.body.companyName,
        number: req.body.number,
        fax: req.body.fax,
        city: req.body.city,
        address: req.body.address,
    });
    res.status(201).json(post);
};
