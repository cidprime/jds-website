const express = require('express');
const router = express.Router();

const authCtrl = require('../controllers/auth');
const verifyToken = require('../middlewares/verifyToken');

router.post('/signup', authCtrl.signup);
router.post('/signin', authCtrl.signin);
router.get('/signout', authCtrl.signout);
router.get('/me', verifyToken, authCtrl.me);

module.exports = router;
