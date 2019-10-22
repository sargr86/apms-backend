const express = require('express');
const router = express.Router();
const usersControllers = require('../controllers/usersControllers');
const validateUsers = require('../validators/validateUsers');




router.get('/get/:id', usersControllers.getOne);
router.post('/addUsers', validateUsers.rules, usersControllers.addUsers);
router.get('/get',  usersControllers.getUsers);
// router.put('/update/:id',validateUsers.rules, usersControllers.update);
router.put('/update/:id',validateUsers.rules, usersControllers.update);
router.delete('/delete/:id', usersControllers.delete);
// router.post('/',  usersControllers.);


module.exports = router;







