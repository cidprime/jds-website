const Course = require('../models/Course');
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
  try {
    const courses = await Course.find();
    res.status(200).json(courses);

  } catch(error) {
    res.status(400).json({error});
  }

};

/**
 * Retrieves courses based on a specific theme.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} A promise that resolves with the courses found based on the theme.
 */
exports.getCoursesByTheme = async (req, res, next) => {
  try {
    const { theme } = req.params;
    const courses = await Course.find({ theme });
    res.json(courses);

  } catch (error) {
    res.status(404).json({error});
  }
}

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
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).send('Course content not found.');

    res.status(200).json(course);

  } catch(error) {
    res.status(404).json({error});
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
    const course = await Course.findById(req.params.id).select('title description imageUrl price level duration rating createdBy syllabus');
    if (!course) return res.status(404).send('Course not found.');
    
    res.status(200).json(course);

  } catch(error) {
    res.status(404).json({error});
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
    const courseObject = JSON.parse(req.body.course);

    delete courseObject._id;

    if (req.file) {
      const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
      const newCourse = new Course({ ...courseObject, imageUrl });

      const saved = await newCourse.save();
      if (saved) {
        return res.json({ message: 'Course created successfully' });
      }
    }

  } catch (error) {
    res.status(500).json({ error });
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
    try {
        const courseObject = req.file ? {
            ...JSON.parse(req.body.course),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        } : { ...req.body };

        // Input validation for course data
        if (!isValidCourseData(courseObject)) {
          return res.status(400).json({ message: 'Invalid course data' });
        }

        const course = await Course.findById(req.params.id);
        
        if(!course) {
            return res.status(401).json({ message: 'not authorized' }); 

        } else {
          const updated = await Course.findByIdAndUpdate(req.params.id, { ...courseObject }, { new: true, runValidators: true });
          if(updated) return res.status(200).json({ message: 'modified course' });
        }

    } catch (error) {
        console.error(`Error modifying course: ${error}`);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

// Function to validate course data 
// This is example before create all fields in fontend
function isValidCourseData(data) {
  if (data && typeof data === 'object' && data.hasOwnProperty('title') && typeof data.title === 'string' && data.hasOwnProperty('description') && typeof data.description === 'String' && data.hasOwnProperty('imageUrl') && typeof data.imageUrl === 'String') {
    return true;
  }
  return false;
}

/**
 * Deletes a course based on the provided course ID.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} JSON response indicating the result of the deletion operation.
 */
exports.deleteCourse = async (req, res, next) => {
  try {
    const courseId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: `Invalid courseId` });
    }

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: `Course not found` });

    const filename = course.imageUrl.split('/images/')[1];

    await fs.unlink(`images/${filename}`);
    await Course.findByIdAndDelete(courseId);

    res.status(200).json({ message: `Course deleted successfully` });

  } catch (error) {
    res.status(500).json({error});
  }
};