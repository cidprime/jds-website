const { checkSchema } = require('express-validator');

exports.sectionSchemaValidation = checkSchema({
  title: {
    isString: {
      errorMessage: "Title must be a string"
    },
    notEmpty: {
      errorMessage: "Title is required"
    }
  },
  chapters: {
    isArray: {
      errorMessage: "chapters must be an array"
    },
    notEmpty: {
      errorMessage: "chapters are required"
    },
    custom: {
      // add custom to make sure the array contains object id
      options: (value) => value.every(id => mongoose.Types.ObjectId.isValid(id)),
      errorMessage: "Each chapter must be a valid ObjectId"
    }
  },
  quiz: {
    notEmpty: {
      errorMessage: "chapters are required"
    },
    custom: {
      options: (value) => value.every(id => mongoose.Types.ObjectId.isValid(id)),
      errorMessage: "Each quiz must be a valid ObjectId"
    }
  },
});