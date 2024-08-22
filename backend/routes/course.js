const express = require('express');
const router = express.Router();

const courseCtrl = require('../controllers/course');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


router.post('/', auth, multer, courseCtrl.createCourse);
router.put('/:id', auth, multer, courseCtrl.modifyCourse);
router.delete('/:id', auth, courseCtrl.deleteCourse);

router.get('/', courseCtrl.getAllCourses);
router.get('/theme/:theme', courseCtrl.getCoursesByTheme);
router.get('/:id/info', courseCtrl.getCourseInfo);
router.get('/:id/content', auth, courseCtrl.getCourseContent);


module.exports = router;