const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');
  if(!token) return res.status(401).json({ message: 'Access denied'});

  try {
    const decodedToken = jwt.verify(token, 'RANDOM_SECRET_TOKEN');
    req.auth = decodedToken;
    next();

  } catch (error) {
    res.status(400).json({error});
  }
}