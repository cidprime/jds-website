const errorHandler = require('../utils/errorHandler');
const auth = require('./verifyToken');

module.exports = (req, res, next) => {
  if (!req.auth || req.auth.role !== '2584') {
    return next(errorHandler(403, 'Forbidden'));
  }
  next();
};