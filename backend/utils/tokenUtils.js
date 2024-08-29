const jwt = require('jsonwebtoken');

exports.generateToken = (userId, role) => {
  return jwt.sign(
    { userId, role, iat: Math.floor(Date.now() / 1000) },
    process.env.JWT_SECRET,
    { expiresIn: '6h' }
  );
};
