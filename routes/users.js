const express = require('express');
const router = express.Router();
const usersControllers = require('../controllers/usersControllers');
const validateUsers = require('../validators/validateUsers');




router.get('/get/:id', usersControllers.getOne);
router.post('/addUsers', validateUsers.rules, usersControllers.addUsers);
router.get('/get', validateUsers.rules, usersControllers.getUsers);
router.put('/update/:id', usersControllers.update);
router.delete('/delete/:id', usersControllers.delete);
// router.post('/',  usersControllers.);


module.exports = router;







