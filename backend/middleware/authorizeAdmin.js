const authorizeAdmin = (req, res, next) => {
  if (!req.auth || req.auth.role !== 'admin') {
    return res.status(403).json({ message: `Unauthorized to create a course` });
  }
  next();
};