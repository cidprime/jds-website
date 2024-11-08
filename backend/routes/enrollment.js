const express = require('express');
const router = express.Router();

const enrollmentCtrl = require('../controllers/enrollment');

router.get('/', enrollmentCtrl.getAllEnrollments);
router.get('/user/:id', enrollmentCtrl.getUserEnrollment);

router.post('/', enrollmentCtrl.enrollAndTrackProgress);
router.put('/:id', enrollmentCtrl.modifyEnrollment);
router.delete('/:id', enrollmentCtrl.deleteEnrollment);


module.exports = router;