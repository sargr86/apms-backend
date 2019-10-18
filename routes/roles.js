const express = require('express');
const router = express.Router();
const usersControllers = require('../controllers/usersControllers');



router.post('/add',  usersControllers.addRole);
router.get('/get',  usersControllers.getRoles);


module.exports = router;







