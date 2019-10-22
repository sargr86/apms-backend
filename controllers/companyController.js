const Company = require('../models/company');
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
    const company = await Company.findOne({ _id: req.params.id });

    if(company) {
        res.status(200).json({
            success: true,
            company: company
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
        let companies = await Company.find({});
        res.status(200).json({
            success: true,
            companies
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


    let company = await Company.create({
        companyName: req.body.companyName,
        number: req.body.number,
        fax: req.body.fax,
        city: req.body.city,
        address: req.body.address,
    });
    // res.status(201).json(post);
    // res.status(201);
    res.status(200).json({msg:"new company is added"})
};



//update
module.exports.update = async (req,res)=>{
    const company = req.body;
    const id = req.params.id;
    console.log(req.body);
    try{
        await  Company.findByIdAndUpdate(id, req.body, {new: true}, (company)=>{
            res.status(200).json({msg:"the company details are updated successfully"});
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
        await  Company.findByIdAndDelete({_id: id});
        res.status(200).json({msg:'deleted successfully'})
    }catch (e) {
        res.status(500).json({msg:'error', delete: e})
    }
}
