const express = require('express');
const router = express.Router();
const usersControllers = require('../controllers/usersControllers');
const validateUsers = require('../validators/validateUsers');


router.post('/addUsers', validateUsers.rules, usersControllers.addUsers);
router.get('/get', validateUsers.rules, usersControllers.getUsers);
// router.post('/',  usersControllers.);


module.exports = router;







