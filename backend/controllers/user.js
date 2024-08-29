const User = require('../models/User');
const bcrypt = require('bcrypt');
const { matchedData } = require('express-validator');

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
    const users = await User.find();
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
  try {
    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).json({ message: 'User not found'});

    res.json({ user });

  } catch(err) {
    console.error(`Error in getOneUser: ${err}`);
    res.status(400).json({ error: err.message });
  }
}

/**
 * Creates a new user based on the provided request data.
 * Validates the email, password, name, and role fields.
 * Checks if the role is valid ('student', 'admin', 'professor').
 * Ensures no user with the same email exists.
 * Hashes the password before saving the user to the database.
 * Responds with appropriate status codes and messages for success and errors.
 *
 * @param {Object} req - The request object containing user data.
 * @param {Object} res - The response object for sending responses.
 * @param {Function} next - The next middleware function.
 * @returns {Object} JSON response indicating success or failure of user creation.
 */
exports.createUser = async (req, res, next) => {
  const data = matchedData(req);

  try {
    const userExist = await User.findOne({ email: data.email });
    if (userExist) {
      return res.status(400).json({ message: 'Unable to create an account with this email' });
    }

    const hash = await bcrypt.hash(data.password, 10);
    const user = new User({
      ...data,
      password: hash
    });

    await user.save();
    return res.status(201).json({ message: 'New user created' });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

exports.modifyUser = async (req, res, next) => {
  const data = matchedData(req);

  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const hash = await bcrypt.hash(data.password, 10);
    const updatedUser = { ...data, password: hash };
    const options = { new: true, runValidators: true };

    const updatedUserData = await User.findByIdAndUpdate(req.params.id, updatedUser, options);
    if(!updatedUserData) return res.status(404).json({ message: 'User not found' });

    return res.json({ message: 'User modified successfully' });
    
  } catch(err) {
    return res.status(500).json({ message: 'An error occurred while modifying the user' });
  }
}

exports.deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);
    if(!user) {
      return res.status(401).json({ message: 'unauthorized' });
    }

    await User.findByIdAndDelete(userId);
    res.json({ message: 'user deleted successfully' })

  } catch(err) {
    res.status(500).json({ error: err.message });
  }
}