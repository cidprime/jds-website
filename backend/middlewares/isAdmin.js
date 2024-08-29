const auth = require('./auth');
/**
 * Middleware function to check if the request is authorized as an admin.
 * If not authorized, returns a 403 status with a message.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
module.exports = (req, res, next) => {
  if (!req.auth && req.auth.role !== 'admin') {
    return res.status(403).json({ message: `Unauthorized to create, modify or delete a course` });
  }
  next();
};