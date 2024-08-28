const { body, validationResult } = require('express-validator');

module.exports = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Email is invalid'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    body('role').optional().isIn(['student', 'admin', 'professor']).withMessage('Role must be either student, professor or admin'),
    body('Enrollments').optional().isArray().withMessage('Enrollments must be an array of ObjectIds'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        
      }
      next();
    }
  ];
