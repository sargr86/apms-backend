const express = require('express');
const router = express.Router();

const companyController = require('../controllers/companyController');
const validateCompany = require('../validators/validateCompany');




// validateCompany.rules,
router.post('/', validateCompany.rules, companyController.create);

// router.post('/', validateCompany.rules, authController.register, companyController.create);

module.exports = router



