const User = require('../models/User');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/tokenUtils');
const errorHandler = require('../utils/errorHandler');

// Inscription d'un nouvel utilisateur
/**
 * Handles user signup process.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise} A promise that resolves with a JSON response indicating the success or failure of user creation.
 */
exports.signup = async (req, res, next) => {
  const { firstname, lastname, email, password } = req.body;

  try {
    const userExist = await User.findOne({ email });
    if (userExist) next(errorHandler(400, 'Unable to create an account with this email'));

    const hash = await bcrypt.hash(password, 10);
    const user = new User({
      firstname,
      lastname,
      email,
      password: hash
    });

    await user.save();
    return res.status(201).json("User created successfully");

  } catch (error) {
    next(error);
  }
}

// Connextion d'un ancien utilisateur
/**
 * Handles the login functionality.
 * Retrieves user credentials from the request body, validates them,
 * generates a token if credentials are correct, and returns user details without the password.
 * Sets an access token cookie for the client and sends the user details in the response.
 * If any errors occur during the process, sends an appropriate error response.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} - JSON response containing user details or an error message.
 */
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email });

    if(!user) return next(errorHandler(404, 'Wrong credentials!'));

    const valid = await bcrypt.compare(password, user.password);

    if(!valid) return next(errorHandler(401, 'Wrong credentials!'));

    const token = generateToken(user._id, user.role);

    const { password: pass, ...rest } = user._doc; // return result without password
    
    res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);

  } catch(error) {
    next(error);
  }
}

/**
 * Logout the user and invalidate the token by adding it to the blacklist.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} - JSON response indicating the success or failure of the logout operation.
 */
exports.logout = async (req, res, next) => {
  try {
    res.clearCookie('access_token');
    res.status(200).json({ message: `Logout successful` });

  } catch (error) {
    next(error);
  }
}

/**
 * Middleware function to retrieve the user's own profile information.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} JSON object with the user's profile information or an error message.
 */
exports.me = async (req, res, next) => {
  if(req.auth.userId === req.params.id) {
    
    try {
      const user = await User.findById(req.auth.userId).select('-password');
      res.json({ user });
      
    } catch (err) {
      next(err);
    }

  } else {
    return next(errorHandler(401, 'Unauthorized'));
  }
}