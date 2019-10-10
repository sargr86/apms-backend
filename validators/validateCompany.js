// Express Validator
const {body} = require('express-validator');

const Company = require('../models/company');


const rules =
    [
        [
            body('companyName').not().isEmpty().withMessage('name is required'),
            body('number').not().isEmpty().withMessage('number is required').isNumeric().withMessage('number is invalid'),
            body('fax').not().isEmpty().withMessage('fax is required').isNumeric().withMessage('fax is invalid'),
            body('city').not().isEmpty().withMessage('city is required'),
            body('address').not().isEmpty().withMessage('address is required'),

            body().custom(async (req) => {

                let companyName = req.companyName;
                let number = req.number;
                let fax = req.fax;
                let city = req.city;
                let address = req.address;

                let found = await Company.findOne({companyName: companyName});
                if (found) {
                    throw new Error('A company with such name exists');
                    // res.send('sdfvdfv')
                }

                //Number
                let foundnumber = await Company.findOne({number: number});
                if (foundnumber) throw new Error('The phone number already exists');

                //fex

                let foundfex = await Company.findOne({fax: fax});
                if (foundfex) throw new Error('The fax number already exists');

                // if (foundfex) {
                //     throw new Error('The fax number already  exists');
                // }
                //city

                let foundCity = await Company.findOne({city: city});
                if (foundCity) throw new Error('A city with such name exists');

                //address


                let foundaddress = await Company.findOne({foundaddress: address});
                // let foundaddress = await Company.findOne({foundaddress: address});
                if (foundaddress) throw new Error('A address with such name exists');


            })]];


module.exports = {
    rules
};







