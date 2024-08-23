const express = require('express');
const router = express.Router();

const courseCtrl = require('../controllers/course');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const authorizeAdmin = require('../middleware/authorizeAdmin');
const validateCourse = require('../middleware/validateCourse');


router.post('/', auth, authorizeAdmin, validateCourse, multer, courseCtrl.createCourse);
router.put('/:id', auth, authorizeAdmin, validateCourse, multer, courseCtrl.modifyCourse);
router.delete('/:id', auth, authorizeAdmin, courseCtrl.deleteCourse);

router.get('/', courseCtrl.getAllCourses);
router.get('/theme/:theme', courseCtrl.getCoursesByTheme);
router.get('/:id/info', courseCtrl.getCourseInfo);
router.get('/:id/content', auth, courseCtrl.getCourseContent);


module.exports = router;