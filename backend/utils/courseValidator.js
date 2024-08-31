const { body, validationResult, checkSchema } = require('express-validator');
const mongoose = require('mongoose');

module.exports = [
  body('course').isString().withMessage('Course must be a string'),
  body('course').custom(value => {
    const courseObject = JSON.parse(value);
    const requiredFields = ['title', 'description', 'image', 'content', 'creator', 'level', 'duration', 'tags'];
    const missingFields = requiredFields.filter(field => !courseObject[field]);
    if (missingFields.length > 0) {
      throw new Error(`${missingFields.join(', ')} are required fields`);
    }
    return true;
     
  }),
  body('title')
    .isString().withMessage('Title must be a string')
    .notEmpty().withMessage('Title is required'),
  body('description')
    .isString().withMessage('Description must be a string')
    .notEmpty().withMessage('Description is required'),
  body('imageUrl')
    .isString().withMessage('Image URL must be a string')
    .notEmpty().withMessage('Image URL is required'),
  body('sections')
    .isArray().withMessage('Sections must be an array')
    .notEmpty().withMessage('Sections are required')
    .custom((value) => value.every(id => mongoose.Types.ObjectId.isValid(id))).withMessage('Each section must be a valid ObjectId'),
  body('createdBy')
    .isArray().withMessage('CreatedBy must be an array')
    .notEmpty().withMessage('CreatedBy is required')
    .custom((value) => value.every(id => mongoose.Types.ObjectId.isValid(id))).withMessage('Each createdBy must be a valid ObjectId'),
  body('price')
    .isNumeric().withMessage('Price must be a number')
    .optional(),
  body('level')
    .isString().withMessage('Level must be a string')
    .notEmpty().withMessage('Level is required'),
  body('duration')
    .isNumeric().withMessage('Duration must be a number')
    .notEmpty().withMessage('Duration is required'),
  body('tags')
    .isArray().withMessage('Tags must be an array')
    .notEmpty().withMessage('Tags are required')
    .custom((value) => value.every(tag => typeof tag === 'string')).withMessage('Each tag must be a string'),
  body('rating')
    .isNumeric().withMessage('Rating must be a number')
    .optional(),
  body('syllabus')
    .isArray().withMessage('Syllabus must be an array')
    .optional()
    .custom((value) => value.every(item => typeof item === 'string')).withMessage('Each syllabus item must be a string'),
  body('createdAt')
    .isISO8601().withMessage('CreatedAt must be a valid date')
    .optional(),
  body('updatedAt')
    .isISO8601().withMessage('UpdatedAt must be a valid date')
    .optional(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
      
    }
    next();
  }
];


exports.courseSchemaValidation = checkSchema({
  title: {
    isString: {
      errorMessage: "Title must be a string"
    },
    notEmpty: {
      errorMessage: "Title is required"
    }
  },
  description: {
    isString: {
      errorMessage: "Description must be a string"
    },
    notEmpty: {
      errorMessage: "Description is required"
    }
  },
  imageUrl: {
    isString: {
      errorMessage: "Image url must be a string"
    },
    notEmpty: {
      errorMessage: "Image url is required"
    }
  },
  sections: {
    isArray: {
      errorMessage: ""
    },
    notEmpty: {
      errorMessage: "Section is required"
    },
    custom: {
      // add custom to make sure the array contains object id
    }
    // also add a sanitization
  }
});