const Users = require('../models/user');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const http = require('http');
const to = require('../helpers/getPromiseResult');
// const Roles = require('../models/roles');


// Express Validator
const {validationResult} = require('express-validator');

const getErrors = require('../helpers/getValidatorErrors');

// exports.addUsers = async (req,res)=>{
//     const today = new Date();
//     const userData ={
//         first_name: req.body.firstName,
//         last_name: req.body.lastName,
//         email: req.body.email,
//         role: req.body.role
//
//     };
//     console.log('user Data'. userData);
//     let data = await User.findOne({
//         where:{
//             email: req.body.email,
//         }
//     })
//     try {
//         await new User(userData).save();
//         res.status(201).json({success: true, data: userData})
//     }catch (e) {
//         res.status(500).json(e)
//     }
// };
//getOne

exports.getOne = async (req, res) => {
    try {
        let user = await Users.find({_id: req.params.id});
        res.status(200).json({
            success: true,
            user
        })
    } catch (e) {
        res.status(500).json({
            error: e
        })
    }
};

exports.addUsers = async (req, res) => {
    let data = req.body;

    // Getting validation result from express-validator
    if (!getErrors(req, res)) {
        // Users.findOne({email: req.body.email}, (err, user) => {
        //     if (user) {
        //         // console.log('jbjk');
        //         // let newCode = Math.random().toString(36).substring(4);
        //         // let hashedPassword = bcrypt.hashSync(newCode);
        //         // Users.update({email: req.body.email}, {new: true}, (err, user) => {
        //         //     if (err) return err;
        //         // let transporter = nodemailer.createTransport({
        //         //     service: 'gmail',
        //         //     auth: {
        //         //         user: 'aram.soghomonyan94@gmail.com',
        //         //         pass: '96119011'
        //         //     },
        //         //     tls: {
        //         //         rejectUnauthorized: false
        //         //     }
        //         // });
        //         // let HelperOptions = {
        //         //     from: 'aram.soghomonyan94@gmail.com',
        //         //     to: req.body.email,
        //         //     subject: "Password Code:",
        //         //     html: '<p>Your new code: ${newCode}</p>'
        //         // };
        //         // transporter.sendMail(HelperOptions, (error, info) => {
        //         //     console.log(req.body);
        //         //     if (error) {
        //         //         console.log(error)
        //         //     }
        //         //     res.json("sent");
        //         // });
        //     } else {
        //         res.status(204).send("")
        //     }
        // });
        // console.log('////');

        // Adding the new user or returning error otherwise
        await to(Users.create(data), res);

        res.status(201).json({msg: 'The user is added successfully', success: true})
    }


};


exports.getUsers = async (req, res) => {
    let user = await to(Users.find());
    res.json(user);
};


// update
exports.update = async (req, res) => {
    const user = req.body;
    delete user._id;
    const id = req.params.id;
    try {
        if (!getErrors(req, res)) {
            await Users.findByIdAndUpdate(id, user, {new: true, useFindAndModify: false}, () => {
                if (!res.headersSent) {
                    res.status(200).json({msg: "the user details are updated successfully"})
                }
            })
        }
    } catch (e) {
        res.status(500).json({msg: 'error', details: e})
    }
};


//delete
exports.delete = async (req, res) => {
    const id = req.params.id + '';
    console.log(req.params);
    try {
        await Users.findByIdAndDelete({_id: id});
        this.getUsers(req,res);
    } catch (e) {
        res.status(500).json({msg: 'error', delete: e})
    }
};





























