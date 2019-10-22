const express = require('express');
const router = express.Router();

const companyController = require('../controllers/companyController');
const validateCompany = require('../validators/validateCompany');




router.get('/', companyController.getAll);
router.post('/', validateCompany.rules, companyController.create);
router.get('/:id', companyController.getOne);
router.put('/:id', companyController.update);
router.delete('/:id', companyController.delete);




module.exports = router



