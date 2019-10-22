const Roles = require('../models/roles');



// Express Validator
// const {validationResult} = require('express-validator');




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
// exports.update = async(req,res)=>{
//     const id = req.params.id;
//     try{
//         await Roles.findByIdAndUpdate(id, req.body,{new: true},(roles)=>{
//             // res.status(200).json({msg:"updated successfully a post with id = " + id})
//             res.status(200).json({msg:"the company details are updated successfully"})
//             // the company details are updated successfully
//         })
//     }catch (e) {
//         res.status(500).json({msg:'error', details: e})
//     }
// };


exports.update = async (req, res) => {
    const user = req.body;
    const id = req.params.id;
    try {
        if (!getErrors(req, res)) {

            await Users.findByIdAndUpdate(id, req.body, {new: true}, () => {
                res.status(200).json({msg: "the user details are updated successfully"})
            })
        }
    } catch (e) {
        res.status(500).json({msg: 'error', details: e})
    }
};


//delete
exports.delete = async(req,res)=>{
    const id = req.params.id + '';
    try{
        await Roles.finByIdAndDelete({_id: id});
        res.status(200).json({msg:'the user details are deleted successfully'})
    }catch (e) {
        res.status(500).json({msg:'error', delete: e})
    }
};









