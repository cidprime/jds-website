const jwt = require('jsonwebtoken');
require('dotenv').config;

/**
 * Middleware function to verify the JWT token in the request header.
 * If the token is valid, extracts the user ID and role from the token and attaches them to the request object.
 * If the token is invalid or missing, returns an error response.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function in the stack.
 */
module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');
  if(!token) return res.status(401).json({ message: 'Access denied'});

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const { userId, role, iat } = decodedToken;
    req.auth = {
      userId,
      role
    };
    next();

  } catch (error) {
    res.status(400).json({error});
  }
}