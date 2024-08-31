const jwt = require('jsonwebtoken');
const tokenBlacklist = require('../models/tokenBlacklist');
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
  const token = req.header('x-auth-token');
  if(!token) return res.status(401).json({ message: 'No token provided'});

  try {
    // Ckech if the token is blacklisted
    const blacklistedToken = await tokenBlacklist.findOne({ token });
    if (blacklistedToken) return res.status(401).json({ message: 'Token is invalid' });

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