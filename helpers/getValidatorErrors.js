// Express Validator
const {validationResult} = require('express-validator');

module.exports = (req, res) => {
    const errors = validationResult(req);

    // Handling database connection error
    if (!errors.isEmpty()) {
        let singleError = errors.array()[0];
        if (singleError.hasOwnProperty('msg') && singleError.msg.includes('ECONNREFUSED 127.0.0.1:3306')) {
            singleError = 'Please check db connection';
            res.status(422).json({db_error: singleError});
            return true;
        } else {
            res.status(422).json(singleError);
            return true;
        }
    }

    else return false;
};
