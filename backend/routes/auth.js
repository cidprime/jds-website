const express = require('express');
const router = express.Router();

const authCtrl = require('../controllers/auth');
const auth = require('../middlewares/auth');

router.post('/signup', authCtrl.signup);
router.post('/login', authCtrl.login);
router.get('/logout', auth, authCtrl.logout);
router.get('/me', auth, authCtrl.me);

module.exports = router;
