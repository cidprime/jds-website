const express = require('express');
const router = express.Router();

const courseCtrl = require('../controllers/course');
const multer = require('../middlewares/multer-config');
const verifyToken  = require('../middlewares/verifyToken');
const isAdmin = require('../middlewares/isAdmin');

router.post('/', verifyToken, multer, courseCtrl.createCourse);
router.put('/:id', verifyToken, multer, courseCtrl.modifyCourse);
router.delete('/:id', verifyToken, courseCtrl.deleteCourse);

router.get('/', courseCtrl.getAllCourses);
router.get('/:id/info', courseCtrl.getCourseInfo);
router.get('/:id/content', verifyToken, courseCtrl.getCourseContent);

module.exports = router;