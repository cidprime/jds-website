const Course = require('../models/Course');
const errorHandler = require('../utils/errorHandler');
const fs = require('fs').promises;

/**
 * Retrieves all courses from the database and sends a JSON response with the courses.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} - A promise that resolves once the operation is complete.
 */
exports.getAllCourses = async (req, res, next) => {
  const { theme } = req.query;

  try {
    let courses;

    if(theme) {
      courses = await Course.find({ theme }).select('-sections');
  
    } else {
      courses = await Course.find().select('-sections');
    }

    return res.json(courses);

  } catch(err) {
    res.status(400).json({ error: err.message });
  }

};


/**
 * Retrieves a specific course content based on the provided course ID.
 * 
 * @param {Object} req - The request object containing the course ID in the parameters.
 * @param {Object} res - The response object to send back the course content.
 * @param {Function} next - The next middleware function in the request-response cycle.
 * @returns {Object} The JSON response with the course content or an error message if the course is not found.
 */
exports.getCourseContent = async (req, res, next) => {
  try{
    const course = await Course.findById(req.params.id).select('title sections createdBy level duration syllabus');
    if (!course) return res.status(404).send('Course content not found.');

    res.status(200).json(course);

  } catch(err) {
    res.status(404).json({ error: err.message});
  }
};

/**
 * Retrieves information for a specific course based on the provided course ID.
 * 
 * @param {Object} req - The request object containing the course ID in the parameters.
 * @param {Object} res - The response object to send back the course information.
 * @param {Function} next - The next middleware function in the request-response cycle.
 * @returns {Object} The course information (title, description,imageUrl, price, level, duration, rating, createdBy, syllabus) if found, or an error message if the course is not found.
 */
exports.getCourseInfo = async (req, res, next) => {
  try{
    const course = await Course.findById(req.params.id).select('-sections');
    if (!course) return next(errorHandler(404, 'Course not found'));
    
    res.json(course);

  } catch(err) {
    res.status(404).json({ error: err.message });
  }
};

/**
 * Creates a new course based on the request data.
 * Parses the course object from the request body, removes unnecessary fields (_id, _userId),
 * and saves the course with an image URL if a file is uploaded.
 * Responds with a success message if the course is saved successfully, otherwise handles errors.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} JSON response indicating the status of the course creation.
 */
exports.createCourse = async (req, res, next) => { 
  try {
    const newCourse = await Course.create(req.body);
    res.status(201).json(newCourse);

/*
    const courseObject = JSON.parse(req.body);
    delete courseObject._id;
    if (req.file) {
      const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
      const newCourse = new Course({ ...courseObject, imageUrl });
      await newCourse.save();
      return res.json({ message: 'Course created successfully' });
    }
*/
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Modify a course based on the request data.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} JSON response indicating success or failure of course modification.
 */
exports.modifyCourse = async (req, res, next) => {
  if(req.auth.role !== 'student') {

    try {
      const course = await Course.findById(req.params.id);
      if(!course) return next(errorHandler(404, 'Course not found'));

      const courseUpdated = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
      return res.status(200).json(courseUpdated);
  
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }

  } else {
    return next(errorHandler(401, 'Unauthorized'));
  }
  
};


/**
 * Deletes a course based on the provided course ID.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} JSON response indicating the result of the deletion operation.
 */
exports.deleteCourse = async (req, res, next) => {
  if(req.auth.role !== 'student') {
    try {
      const courseId = req.params.id;

      const course = await Course.findById(courseId);
      if (!course) return next(errorHandler(404, 'Course not found'));

      // const filename = course.imageUrl.split('/images/')[1];
      // await fs.unlink(`images/${filename}`);

      await Course.findByIdAndDelete(courseId);

      res.json("Course deleted successfully");

    } catch (error) {
      res.status(500).json({error});
    }
  } else {
    return next(errorHandler(401, 'Unauthorized'));
  }
};