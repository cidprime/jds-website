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
      errorMessage: "Sections must be an array"
    },
    notEmpty: {
      errorMessage: "Section is required"
    },
    custom: {
      // add custom to make sure the array contains object id
      options: (value) => value.every(id => mongoose.Types.ObjectId.isValid(id)),
      errorMessage: "Each section must be a valid ObjectId"
    } // also add a sanitization
  },
  createdBy: {
    isArray: {
      errorMessage: "CreatedBy must be an array"
    },
    notEmpty: {
      errorMessage: "CreatedBy is required"
    },
    custom: {
      options: (value) => value.every(id => mongoose.Types.ObjectId.isValid(id)),
      errorMessage: "Each CreatedBy must be a valid ObjectId"
    }
  },
  price: {
    optional: true,
    isNumeric: {
      errorMessage: "Price must be a number"
    }
  },
  level: {
    isString: {
      errorMessage: "Level must be a string"
    },
    notEmpty: {
      errorMessage: "Level is required"
    }
  },
  duration: {
    isNumeric: {
      errorMessage: "Duration must be a number"
    },
    notEmpty: {
      errorMessage: "Duration is required"
    }
  },
  tags: {
    isArray: {
      errorMessage: "Tags must be an array"
    },
    notEmpty: {
      errorMessage: "Tags are required"
    },
    custom: {
      options: (value) => value.every(tag => typeof tag === 'string'),
      errorMessage: "Each tag must be a string"
    }
  },
  rating: {
    optional: true,
    isNumeric: {
      errorMessage: "Rating must be a number"
    }
  },
  syllabus: {
    isArray: {
      errorMessage: "Syllabus must be an array"
    },
    notEmpty: {
      errorMessage: "Syllabus is required"
    },
    custom: {
      options: (value) => value.every(item => typeof item === 'string'),
      errorMessage: "Each syllabus item must be a string"
    }
  },
  createdAt: {
    optional: true,
    isISO8601: {
      errorMessage: "CreatedAt must be a valid date"
    }
  },
  updatedAt: {
    optional: true,
    isISO8601: {
      errorMessage: "CreatedAt must be a valid date"
    }
  },
});