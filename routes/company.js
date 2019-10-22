const express = require('express');
const router = express.Router();

const companyController = require('../controllers/companyController');
const validateCompany = require('../validators/validateCompany');




router.get('/', companyController.getAll);
router.get('/:id', companyController.getOne);
router.put('/:id', companyController.update);
router.delete('/:id', companyController.delete);
router.post('/', validateCompany.rules, companyController.create);


module.exports = router



