const Company = require('../models/company');
// const to = require('../helpers/getPromiseResult');
const getErrors = require('../helpers/getValidatorErrors');

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
    const company = await Company.findOne({_id: req.params.id});

    if (company) {
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
module.exports.getAll = async (req, res) => {
    try {
        let companies = await Company.find({});
        res.status(200).json({
            success: true,
            companies
        })
    } catch (e) {
        res.status(500).json({
            error: e
        })
    }
};

//create
module.exports.create = async (req, res) => {
    let data = req.body;

    // Getting validation result from express-validator
    // if(!getErrors())
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
    res.status(200).json({msg: "new company is added"})
};


//update
// module.exports.update = async (req,res)=>{
//     const company = req.body;
//     const id = req.params.id;
//     console.log(req.body);
//     try{
//         if(!getErrors(req,res)){
//             await  Company.findByIdAndUpdate(id, req.body, {new: true}, ()=>{
//                 res.status(200).json({msg:"the company details are updated successfully"});
//             })
//         }
//     }catch (e) {
//         res.status(500).json({msg: 'error', details: e})
//     }
// };

//update
// module.exports.update = async (req, res) => {
//     const company = req.body[0];
//     const id = req.params.id;
//     console.log(req.body);
//     try {
//         if (!getErrors(req, res)) {
//
//             await Company.findByIdAndUpdate(id, req.body, {new: true}, () => {
//                 res.status(200).json({msg: "the user details are updated successfully"})
//             })
//         }
//     } catch (e) {
//         res.status(500).json({msg: 'error', details: e})
//     }
// }

////////////////////////////////////////////////

// module.exports.update = async (req, res) => {
//     const company = req.body;
//     const id = req.params.id;
//     try {
//         if (!getErrors(req, res)) {
//
//             let company = await Company.findOne({_id: req.params.id});
//             console.log(company)
//             await company.save();
//             console.log('aaa');
//             res.status(200).json({msg: "the company details are updated successfully"})
//         }
//     } catch (e) {
//         res.status(500).json({msg: 'error', details: e})
//     }
// };
//


// module.exports.update = async (req, res) => {
//     const company = req.body;
//     const id = req.params.id;
//     try {
//         if (!getErrors(req, res)) {
//
//             await Company.findByIdAndUpdate(id, req.body, {new: true}, (company) => {
//                 res.status(200).json({msg: "the user details are updated successfully"})
//             })
//         }
//     } catch (e) {
//         res.status(500).json({msg: 'error', details: e})
//     }
// };


exports.update = async (req, res) => {
    const company = req.body;
    delete company._id;
    const id = req.params.id;
    console.log('aaa')
    console.log(req.body)
    try {


        if (!getErrors(req, res)) {
            await Company.findByIdAndUpdate(id, company, {new: true, useFindAndModify: false}, () => {
                if (!res.headersSent) {
                    res.status(200).json({msg: "the company details are updated successfully"})
                }
            })

        }


    } catch (e) {
        // console.log({msg: 'error', details: e});
        res.status(500).json({msg: 'error', details: e})
    }
};


// exports.update = async (req, res) => {
//     const user = req.body;
//     const id = req.params.id;
//     try {
//         await Users1.findByIdAndUpdate(id, req.body, {new: true}, () => {
//             res.status(200).json({msg: "the user details are updated successfully"})
//         // if (!getErrors(req, res)) {
//         //
//         //
//             })
//         // }
//     } catch (e) {
//         res.status(500).json({msg: 'error', details: e})
//     }
// };


// Post.findByIdAndUpdate(id, req.body, {new:true}, (err, company)=> {
//     res.status(200).json({msg:"updated successfully a post with id = " + id});
// })


//delete
module.exports.delete = async (req, res) => {
    const id = req.params.id + '';
    try {
        await Company.findByIdAndDelete({_id: id});
        this.getAll(req, res);
    } catch (e) {
        res.status(500).json({msg: 'error', delete: e})
    }
}
