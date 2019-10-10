const express = require('express');
const router = express.Router();

const companyController = require('../controllers/companyController');
const validateCompany = require('../validators/validateCompany');




// validateCompany.rules,
// router.get('/',post.getAll);



router.get('/', companyController.getAll);

// router.get('/:id', post.getOne);
// router.post('/', post.create);
// router.put('/:id',post.update);
// router.delete('/:id', post.delete);


// router.get('/', post.getAll);
router.post('/', validateCompany.rules, companyController.create);

// router.post('/', validateCompany.rules, authController.register, companyController.create);

module.exports = router



