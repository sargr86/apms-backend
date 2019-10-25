const express = require('express');
const router = express.Router();
const CompanyUser = require('../controllers/companyuser');




router.post('/post', CompanyUser.postCompanyUser);



// router.put('/update/:id', CompanyUser.update);




module.exports = router;