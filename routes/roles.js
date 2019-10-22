const express = require('express');
const router = express.Router();
// const usersControllers = require('../controllers/usersControllers');
const rolesController= require('../controllers/rolesController');



router.post('/add',  rolesController.addRole);
router.get('/get',  rolesController.getRoles);
router.get('/get/:id', rolesController.getOneRoles);
router.put('/update/:id', rolesController.update);
router.delete('/delete/:id', rolesController.delete);




module.exports = router;







