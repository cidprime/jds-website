const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
// const { userSchemaValidation } = require('../utils/userValidator');
// const { handleValidationResults } = require('../utils/handleValidationResults');
const verifyToken = require('../middlewares/verifyToken');
const isAdmin = require('../middlewares/isAdmin');

router.get('/', userCtrl.getAllUsers);
router.get('/:id', verifyToken, userCtrl.getOneUser);

router.put('/:id', verifyToken, userCtrl.modifyUser);
router.delete('/:id', verifyToken, userCtrl.deleteUser);


module.exports = router;