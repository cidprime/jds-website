const { checkSchema } = require('express-validator');

exports.chapterSchemaValidation = checkSchema({
  title: {
    isString: {
      errorMessage: "Title must be a string"
    },
    notEmpty: {
      errorMessage: "Title is required"
    }
  },
  videoUlr: {
    optional: true,
    isURL: {
      errorMessage: "video must be a URL"
    },
    isArray: {
      errorMessage: "video URL must be an array"
    },
  },
  content: {
    isString: {
      errorMessage: "content must be a string"
    },
    notEmpty: {
      errorMessage: "content is required"
    }
  },
  fileUrl: {
    optional: true,
    isURL: {
      errorMessage: "file must be a URL"
    },
    isString: {
      errorMessage: "file URL must be a string"
    },
    isArray: {
      errorMessage: "fileUrl must be an array"
    },
  },
});