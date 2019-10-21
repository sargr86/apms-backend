const Users = require('../models/users');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const http = require('http');
const to = require('../helpers/getPromiseResult');
const Roles = require('../models/roles');


// Express Validator
const {validationResult} = require('express-validator');

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

exports.getOne= async (req,res)=>{
    try{
        let post = await Users.find({});
        res.status(200).json({
            success: true,
            posts: post
        })
    }catch (e) {
        res.status(500).json({
            error:e
        })
    }
};

exports.addUsers = async (req, res) => {
    let data = req.body;

    // if (this.formioLogin(res)) {
    console.log(req.body);
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
// findOne
    Users.findOne({email: req.body.email}, (err, user) => {
        if (user) {
            // console.log('jbjk');
            // let newCode = Math.random().toString(36).substring(4);
            // let hashedPassword = bcrypt.hashSync(newCode);
            // Users.update({email: req.body.email}, {new: true}, (err, user) => {
            //     if (err) return err;
            // let transporter = nodemailer.createTransport({
            //     service: 'gmail',
            //     auth: {
            //         user: 'aram.soghomonyan94@gmail.com',
            //         pass: '96119011'
            //     },
            //     tls: {
            //         rejectUnauthorized: false
            //     }
            // });
            // let HelperOptions = {
            //     from: 'aram.soghomonyan94@gmail.com',
            //     to: req.body.email,
            //     subject: "Password Code:",
            //     html: '<p>Your new code: ${newCode}</p>'
            // };
            // transporter.sendMail(HelperOptions, (error, info) => {
            //     console.log(req.body);
            //     if (error) {
            //         console.log(error)
            //     }
            //     res.json("sent");
            // });
        } else {
            res.status(204).send("")
        }
    })
    console.log('////')

    // Adding the new user or returning error otherwise
    await to(Users.create(data), res);

    // res.json("OK");
    res.status(201).json({success: true})
    // }
};



exports.getUsers = async (req, res) => {
    let users = await to(Users.find());
    res.status(200).json({
        success: true,
        posts: post
    });
};





// update
exports.update = async (req,res) =>{
    const post = req.body;
    const id = req.params.id;
    try{
        await Users.findByIdAndUpdate(id,req.body,{new: true}, (Users)=>{
            req.status(200).json({msg:"updated successfully a post with id = " + id})
        })
    }catch (e) {
        res.status(500).json({msg:'error', details: e})
    }
};




//delete
exports.delete = async (req,res) =>{
    const id = req.params.id + '';
    try{
        await Users.finByIdAndDelete({_id: id});
        res.status(200).json({msg:'deleted suscess fully a post with id = ' + id});
    }catch (e) {
       res.status(500).json({msg:'error', delete: e})
    }
};












// Role
///////////////////////////////////////////ROLE//////////////////////////////
exports.addRole = async (req,res)=>{
    const roles = await to(Roles.create(req.body))
};

exports.getRoles = async (req,res)=>{
    const roles = await to(Roles.find())
    res.json(roles);
};






// getOne

exports.getOneRoles = async (req,res)=>{
    console.log(req.params.id);
    const  post = await Roles.findOne({_id: req.params.id});
  if(post){
         res.status(200).json({
           success: true,
            post: post
        });
  }else{
       res.status(500).json({
           success: false,
           msg: 'False post id'
        })
   }
};

//update
exports.update = async(req,res)=>{
        const post = req.body;
        const id = req.params.id;
        try{
            await Roles.findByIdAndUpdate(id, req.body,{new: true},(roles)=>{
                res.status(200).json({msg:"updated successfully a post with id = " + id})
            })
        }catch (e) {
            res.status(500).json({msg:'error', details: e})
        }
}




//delete
exports.delete = async(req,res)=>{
    const id = req.params.id + '';
    try{
        await Roles.finByIdAndDelete({_id: id});
        res.status(200).json({msg:'deleted suscess fully a post with id = ' + id})
    }catch (e) {
        res.status(500).json({msg:'error', delete: e})
    }
};

// // delete
// exports.delete = async (req,res)=>{
//     const id  = req.params.id + '';
//     try{
//         await  Post.finByIdAndDelete({_id: id});
//         res.status(200).json({msg:'deleted suscess fully a post with id = ' + id})
//     }catch (e) {
//         res.status(500).json({msg:'error', delete: e})
//     }
// };





// router.post('/forgotEmail/code',  (req, res) => {
//     // exports.addUsers=  async (req, res) => {
//     //
//     // }
//     let email = req.body.email;
//
//
//
// });




