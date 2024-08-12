const express = require('express');
const router = express.Router();

const courseCtrl = require('../controllers/course');
const auth = require('../middleware/auth');


router.post('/', auth, courseCtrl.createCourse);
router.put('/:id', auth, courseCtrl.modifyCourse);
router.delete('/:id', auth, courseCtrl.deleteCourse);

router.get('/', courseCtrl.getAllCourses);
router.get('/:id/info', courseCtrl.getOneCourseInfo);
router.get('/:id/content', courseCtrl.getOneCourseContent);


module.exports = router;