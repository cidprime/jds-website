const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const { userSchemaValidation } = require('../utils/userValidator');
const { handleValidationResults } = require('../utils/handleValidationResults');

router.get('/', userCtrl.getAllUsers);
router.get('/:id', userCtrl.getOneUser);

router.post('/',userSchemaValidation, handleValidationResults, userCtrl.createUser);
router.put('/:id',userSchemaValidation, handleValidationResults, userCtrl.modifyUser);
router.delete('/:id', userCtrl.deleteUser);


module.exports = router;