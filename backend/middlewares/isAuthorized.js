const errorHandler = require('../utils/errorHandler');
const auth = require('./verifyToken');
/**
 * Middleware function to check if the request is authorized as a student.
 * If not authorized, returns a 403 status with a message.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
module.exports = (req, res, next) => {
  if (!req.auth || req.auth.role === '4181') {
    return next(errorHandler(403, 'Forbidden'));
  }
  next();
};