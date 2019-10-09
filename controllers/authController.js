const Users = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const http = require('http');
const to = require('../helpers/getPromiseResult');


// Express Validator
const {validationResult} = require('express-validator');

exports.register = async (req, res) => {
    let data = req.body;

    if (this.formioLogin(res)) {
        // Saving the original password of user and hashing it to save in db
        let originalPass = data.password;
        data.password = bcrypt.hashSync(originalPass, 10);

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

        // Adding the new user or returning error otherwise
        await to(Users.create(data), res);

        res.json("OK");
    }


};


exports.login = async (req, res) => {
    let data = req.body;

    // Getting validation result from express-validator
    const errors = validationResult(req);


    // Handling database connection error

    if (!errors.isEmpty()) {
        let singleError = errors.array()[0];
        if (singleError.hasOwnProperty('msg') && singleError.msg.includes('ECONNREFUSED 127.0.0.1:3306')) {
            singleError = 'Please check db connection';
            return res.status(422).json({db_error: singleError});
        } else return res.status(422).json(singleError);
        // return true;
    }

    const user = await Users.findOne({
        email: data.email
    });

    // User is not active
    if (!user) res.status(500).json({msg: 'You don\'t have such privileges or the account is inactive'});

    else {
        // Cloning users object without password and saving user full name
        let {password, ...details} = user.toJSON();
        let full_name = user[`first_name`] + ' ' + user[`last_name`];


        res.status(200).json({
            token: jwt.sign(details, 'secretkey', {expiresIn: '8h'}), user_id: user.id, full_name: full_name
        })
    }
};


exports.formioLogin = async (res) => {
    // let auth = false;
    const postData = {
        "data": {
            "email": "jamesnicholson630@yahoo.com",
            "password": "davmark11"
        }
    };

    const rp = require('request-promise');

    const options = {
        method: 'POST',
        uri: 'https://formio.form.io/user/login',
        body: postData,
        json: true // Automatically stringifies the body to JSON
    };

    let response = await to(rp(options), res);

    return response instanceof Error;


};
