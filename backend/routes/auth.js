const express = require('express');
const router = express.Router();

const authCtrl = require('../controllers/auth');
const verifyToken = require('../middlewares/verifyToken');

router.post('/signup', authCtrl.signup);
router.post('/login', authCtrl.login);
router.get('/logout', authCtrl.logout);
router.get('/me', verifyToken, authCtrl.me);

module.exports = router;
