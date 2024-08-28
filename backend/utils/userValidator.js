const { body, checkSchema } = require('express-validator');
const mongoose = require('mongoose');

exports.userSchemaValidation = checkSchema({
  name: {
    notEmpty: {
      errorMessage: "Name is required"
    },
    isLength: {
      options: { min: 3, max: 32 },
      errorMessage: "Name must be at least 3 characters with a max of 32 characters"
    }
  },
  email: {
    isEmail: {
      errorMessage: "Email is invalid"
    },
  },
  password: {
    isLength: {
      options: { min: 8 },
      errorMessage: "Password must be at least 8 characters long"
    },
    custom: {
      options: 
        (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value),
      errorMessage: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    }
  },
  role: {
    optional: true,
    isIn: {
      options: [['student', 'admin', 'professor']],
      errorMessage: "Role must be either student, professor or admin"
    }
  },
  Enrollments: {
    optional: true,
    isArray: {
      errorMessage: "Enrollments must be an array"
    },
    custom: {
      options: (value) => value.every(id => mongoose.Types.ObjectId.isValid(id)),
      errorMessage: "Each enrollment must be a valid ObjectId"
    }
  }
});