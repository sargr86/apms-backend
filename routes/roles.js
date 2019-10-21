const express = require('express');
const router = express.Router();
const usersControllers = require('../controllers/usersControllers');



router.post('/add',  usersControllers.addRole);
router.get('/get',  usersControllers.getRoles);
router.get('/get/:id', usersControllers.getOneRoles);
router.put('/update/:id', usersControllers.update);
router.delete('/delete/:id', usersControllers.delete);




module.exports = router;







