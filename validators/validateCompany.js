// // Express Validator
const {body, validationResult } = require('express-validator');
// const Users = require('../models/user');

const Company = require('../models/company');


const rules =
    [
        [



            body('companyName').not().isEmpty().withMessage('name is required'),
            body('number').not().isEmpty().withMessage('number is required').isNumeric().withMessage('number is invalid'),
            body('fax').not().isEmpty().withMessage('fax is required').isNumeric().withMessage('fax is invalid'),
            body('city').not().isEmpty().withMessage('city is required'),
            body('address').not().isEmpty().withMessage('address is required'),

            // body('password', 'Password is required').not().isEmpty(),
    body().custom(async (req) => {
        let companyName = req.companyName;
        let number = req.number;
        let fex = req.fex;
        let city = req.city;
        let address = req.address;

        // let obj = {
        //    name: req.name,
        //     number : req.number,
        //    fex : req.fex,
        //    city : req.city,
        //     address : req.address,
        // }
        // for (prop in object) {
        //     let found123 = await Company.findOne({[prop]: obj[prop]});
        //     if (!found123) throw new Error('A user with such name doesn\'t exist');
        //
        // }
        // Checking email existence & passwords match

    //     let found = await Company.findOne({name: name});
    // if (!found) throw new Error('A user with such name doesn\'t exist');











        let found = await Company.findOne({companyName: companyName});
        if (!found) throw new Error('A user with such name doesn\'t exist');

        //Number

        let foundnumber = await Company.findOne({number: number});
        if (!foundnumber) throw new Error('A user with such name doesn\'t exist');

        //fex

        let foundfex = await Company.findOne({fex: fex});
        if (!foundfex) throw new Error('A user with such name doesn\'t exist');

        //city

        let foundCity = await Company.findOne({city: city});
        if (!foundCity) throw new Error('A user with such name doesn\'t exist');

        //address

        let foundaddress = await Company.findOne({foundaddress: foundaddress});
        if (!foundaddress) throw new Error('A user with such name doesn\'t exist');

        // let foundaddress = await Company.findOne({address: address});
        // if (!foundaddress) throw new Error('A user with such name doesn\'t exist');
        // let foundphone = await Company.findOne({number: number});
        // if (!foundphone) throw new Error('A user with such name doesn\'t exist');
        // let match = await bcrypt.compare(pass, found.password);

        // Passwords mismatch case
        // if (!match) throw new Error('Wrong password')
    })]]
    //     ], (req,res, next) => {
    //     if(!validationResult(req).isEmpty()) {
    //         res.status(401).json({
    //             msg: 'error'
    //         })
    //     }
    //     next()
    // }

// ]

module.exports = {
    rules
};







