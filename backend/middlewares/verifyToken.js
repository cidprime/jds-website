const jwt = require('jsonwebtoken');
const errorHandler = require('../utils/errorHandler');
require('dotenv').config;

/**
 * Middleware function to verify the authorization token in the request header.
 * Checks if the token is blacklisted and decodes it to extract user ID and role.
 * If token is valid, sets user ID and role in the request object and calls the next middleware.
 * If token is invalid or missing, returns an error response.
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 */
module.exports = async (req, res, next) => {
  const token = req.cookies.access_token;
  console.log("Cookies reçus (back):", req.cookies);   // Le front reenvoie pas le cookie

  if(!token) return next(errorHandler(401, 'Unauthorized'));

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if(!decodedToken) return next(errorHandler(403, 'Forbidden'));
    const { userId, role } = decodedToken;
    req.auth = {
      userId,
      role
    };
    next();

  } catch (err) {
    res.status(400).json({ error: err.message} );
  }
}