const express = require('express');
const router = express.Router();

const courseCtrl = require('../controllers/course');
const auth  = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');
const validateCourse = require('../utils/courseValidator');
const multer = require('../middlewares/multer-config');

router.post('/',auth, isAdmin, validateCourse, multer, courseCtrl.createCourse);
router.put('/:id',auth, isAdmin, validateCourse, multer, courseCtrl.modifyCourse);
router.delete('/:id',auth, isAdmin, courseCtrl.deleteCourse);

router.get('/', courseCtrl.getAllCourses);
router.get('/theme/:theme', courseCtrl.getCoursesByTheme);
router.get('/:id/info', courseCtrl.getCourseInfo);
router.get('/:id/content', auth, courseCtrl.getCourseContent);

module.exports = router;