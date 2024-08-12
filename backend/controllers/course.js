const Course = require('../models/Course');

exports.getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);

  } catch(error) {
    res.status(400).json({error});
  }

};

exports.getOneCourseContent = async (req, res, next) => {
  try{
    const course = await Course.findOne({ _id: req.params.id });
    res.status(200).json(course);

  } catch(error) {
    res.status(404).json({error});
  }
};

exports.getOneCourseInfo = async (req, res, next) => {
  try{
    const course = await Course.findById(req.params.id).select('title description price isFree');
    if (!course) return res.status(404).send('Course not found.');
    
    res.status(200).json(course);

  } catch(error) {
    res.status(404).json({error});
  }
};

exports.createCourse = (req, res, next) => {

};

exports.modifyCourse = (req, res, next) => {

};

exports.deleteCourse = (req, res, next) => {

};