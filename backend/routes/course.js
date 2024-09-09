const express = require('express');
const router = express.Router();

const courseCtrl = require('../controllers/course');
const multer = require('../middlewares/multer-config');
const verifyToken  = require('../middlewares/verifyToken');
const isAuthorized = require('../middlewares/isAuthorized');
const isAdmin = require('../middlewares/isAdmin');

router.post('/', verifyToken, isAuthorized, multer, courseCtrl.createCourse);
router.put('/:id', verifyToken, isAuthorized, multer, courseCtrl.modifyCourse);
router.delete('/:id', verifyToken, isAdmin, courseCtrl.deleteCourse);

router.get('/', courseCtrl.getAllCourses);
router.get('/:id/info', courseCtrl.getCourseInfo);
router.get('/:id/content', verifyToken, courseCtrl.getCourseContent); // if is not free pay before

module.exports = router;