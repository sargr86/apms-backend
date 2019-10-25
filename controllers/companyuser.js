const CompanyUser = require('../models/company');
const User = require('../models/user')





// exports.getCompanyUser = async (req,res)=>{
//     const companyuser = await to(CompanyUser.find());
//     res.json(companyuser)
// };
//

// exports.postCompanyUser = async (req, res) => {
//     console.log(req.body.companyId)
//     User.findByIdAndUpdate(req.body.userId, {companyId:req.body.companyId},{new: true},(err,user)=>{
//         console.log(user);
//     })


    // User.find({companyId:req.body.companyId},(err,user)=>{
    //     console.log(user);
    // });
//
// exports.postCompanyUser = async (req, res) => {
//     console.log(req.body.companyId)
//     User.findByIdAndUpdate(req.body.userId, {companyId:req.body.companyId},{new: true},(err,user)=>{
//         console.log(user);
//     })






//
// exports.postCompanyUser = async (req, res) => {
//     // console.log(req.body.companyId);
//     try{
//         await User.findByIdAndUpdate(req.body.userId,{companyId: req.body.companyId},{new : true})
//         // console.log(req.body.companyId);
//         res.status(200).json({msg:"the company have user"})
//         console.log(user);
//     }catch (e) {
//     //     // console.log({msg: 'error', details: e});
//         res.status(500).json({msg: 'error', details: e})
//     }
// };



exports.postCompanyUser = async (req, res) => {
    console.log(req.body.companyId)
    await User.findByIdAndUpdate(req.body.userId, {companyId: req.body.companyId}, {new: true}, (err, user) => {
        console.log(user);
res.status(200).json({msg:"the company have user"})
    })
};

// Post.findByIdAndUpdate(id, req.body, {new:true}, (err, company)=> {
//     res.status(200).json({msg:"updated successfully a post with id = " + id});
// })





/////////////////////////////////////////////////////////////////////////////////hgfsd///////////////////////////
// exports.postCompanyUser = async (req, res) => {
//     console.log(req.body.companyId)
//     User.findByIdAndUpdate(req.body.userId, {companyId:req.body.companyId},{new: true},(err,user)=>{
//         console.log(user);
//     })


// User.find({companyId:req.body.companyId},(err,user)=>{
//     console.log(user);
// });















//
//
// exports.getCompanyUser = async (req,res)=>{
//     console.log(req.params.id);
//     const  post = await CompanyUser.findOne({_id: req.params.id});
//     if(post){
//         res.status(200).json({
//             success: true,
//             post: post
//         });
//     }else{
//         res.status(500).json({
//             success: false,
//             msg: 'False post id'
//         })
//     }
// };