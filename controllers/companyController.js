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





//getOne
module.exports.getOne = async (req, res) => {
    const post = await Post.findOne({ _id: req.params.id });

    if(post) {
        res.status(200).json({
            success: true,
            post: post
        })
    } else {
        res.status(500).json({
            success: false,
            msg: "False post id"
        })
    }
};


//getAll
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

//create
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



//update
module.exports.update = async (req,res)=>{
    const post = req.body;
    const id = req.params.id;
    console.log(req.body);
    try{
        await  Post.findByIdAndUpdate(id, req.body, {new: true}, (company)=>{
            res.status(200).json({msg:"updated successfully a post with id = " + id});
        })

    }catch (e) {
        res.status(500).json({msg: 'error', details: e})
    }
};



// Post.findByIdAndUpdate(id, req.body, {new:true}, (err, company)=> {
//     res.status(200).json({msg:"updated successfully a post with id = " + id});
// })



//delete
module.exports.delete = async (req,res)=>{
    const id = req.params.id + '';
    try{
        await  Post.findByIdAndDelete({_id: id});
        res.status(200).json({msg:'deleted suscess fully a post with id = ' + id})
    }catch (e) {
        res.status(500).json({msg:'error', delete: e})
    }
}
