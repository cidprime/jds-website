const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
// const { userSchemaValidation } = require('../utils/userValidator');
// const { handleValidationResults } = require('../utils/handleValidationResults');
const verifyToken = require('../middlewares/verifyToken');
const isAdmin = require('../middlewares/isAdmin');
const isAuthorized = require('../middlewares/isAuthorized');

router.get('/', verifyToken, isAdmin, userCtrl.getAllUsers);
router.get('/:id', verifyToken, userCtrl.getOneUser);

router.get('/courses/:id', verifyToken, isAuthorized, userCtrl.getUserCourses);

router.put('/update/:id', verifyToken, userCtrl.modifyUser);
router.delete('/delete/:id', verifyToken, userCtrl.deleteUser);


module.exports = router;