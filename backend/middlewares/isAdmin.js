const ROLES = require('../config/roles');
const errorHandler = require('../utils/errorHandler');
const auth = require('./verifyToken');

module.exports = (req, res, next) => {
  if (!req.auth || req.auth.role !== ROLES.ADMIN) {
    return next(errorHandler(403, 'Forbidden'));
  }
  next();
};