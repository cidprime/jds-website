const { body, validationResult } = require('express-validator');

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
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
      
    }
    next();
  }
];