const User = require('../models/User');
const bcrypt = require('bcrypt');
// const { matchedData } = require('express-validator');
const errorHandler = require('../utils/errorHandler');

/**
 * Retrieves all users from the database and sends a JSON response with the users.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} - A promise that resolves once the operation is complete.
 */
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find()
      .select('-password')
      .populate({
        path: 'enrollments',
        populate: [
          { path: 'courses.courseId', select: 'title description imageUrl' },
          { path: 'courses.progressId', select: 'progressCourse' }
        ]
      });
    res.json({ users });

  } catch(err) {
    res.status(400).json({ error: err.message });
  }
}

/**
 * Retrieves a single user by their ID.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} The user object if found, or an error message if not found.
 */
exports.getOneUser = async (req, res, next) => {
  if(req.auth.userId !== req.params.id) return next(errorHandler(401, 'unauthorized'));

  try {
    const user = await User.findById(req.params.id)
      .select('-password -role') // Exclude password field from the query result
      .populate({
        path: 'enrollments',
        populate: [
          { path: 'courses.courseId', select: 'title description imageUrl' },
          { path: 'courses.progressId', select: 'progressCourse' }
        ]
      });
    if(!user) return next(errorHandler(404, 'User not found'));

    res.json({ user });

  } catch(err) {
    res.status(400).json({ error: err.message });
  }
}


exports.modifyUser = async (req, res, next) => {
  if(req.auth.userId !== req.params.id) return next(errorHandler(401, 'unauthorized'));

  try {
    if(req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
      $set: {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        avatar: req.body.avatar
      }
    } , { new: true });

    const { password, role, ...rest } = updatedUser._doc;

    return res.json(rest);
    
  } catch(err) {
    return res.status(500).json({ message: 'An error occurred while modifying the user' });
  }
}

exports.deleteUser = async (req, res, next) => {
  if(req.auth.userId !== req.params.id) return next(errorHandler(401, 'unauthorized'));

  try {
    const userId = req.params.id;
    await User.findByIdAndDelete(userId);

    res.clearCookie('access_token');
    res.json("Account successfully deleted");

  } catch(err) {
    res.status(500).json({ error: err.message });
  }
}