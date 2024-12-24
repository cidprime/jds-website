const User = require('../models/User');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/tokenUtils');
const errorHandler = require('../utils/errorHandler');
const capitalizeFirstLetter = require('../utils/capitalizeFirstLetter');

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
    const token = generateToken(user._id, user.role);
    const { password: pass, ...rest } = user._doc;
    
    res.cookie('access_token', token, { httpOnly: true, expires: new Date(Date.now() + 24*60*60*1000) })
      .status(200)
      .json(rest);

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
exports.signin = async (req, res, next) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email });
    if(!user) return next(errorHandler(404, 'Wrong credentials!'));

    const valid = await bcrypt.compare(password, user.password);
    if(!valid) return next(errorHandler(401, 'Wrong credentials!'));

    const token = generateToken(user._id, user.role);
    const { password: pass, ...rest } = user._doc; // return result without password
    res.cookie('access_token', token, { httpOnly: true, expires: new Date(Date.now() + 24*60*60*1000) })
      .status(200)
      .json(rest);

  } catch(error) {
    next(error);
  }
}

exports.google = async (req, res, next) => {
  const { email, name, avatar } = req.body;
  try{
    const user = await User.findOne({ email });
    if(user) {
      const token = generateToken(user._id, user.role);
      const { password: pass, ...rest } = user._doc; // return result without password and role
      res.cookie('access_token', token, { httpOnly: true, expires: new Date(Date.now() + 24*60*60*1000) })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);

      const hash = await bcrypt.hash(generatedPassword, 10);

      const nameArray = name.toLowerCase().split(' ').map(word => capitalizeFirstLetter(word));
      const [firstname, ...lastnameArray] = nameArray;
      const lastname = lastnameArray.join(' ');

      const user = new User({
        firstname,
        lastname,
        email,
        password: hash,
        avatar
      });
  
      await user.save();
      const token = generateToken(user._id, user.role);
      const { password: pass, role, ...rest } = user._doc;

      res.cookie('access_token', token, { httpOnly: true, expires: new Date(Date.now() + 24*60*60*1000) })
        .status(200)
        .json(rest);
      
    }

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
exports.signout = async (req, res, next) => {
  try {
    res.clearCookie('access_token');
    res.status(200).json({ message: `sign out successful` });

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
      const user = await User.findById(req.auth.userId)
        .select('-password -role') // Exclude password field from the query result
        .populate({
          path: 'enrollments',
          populate: [
            { path: 'courses.courseId', select: 'title description imageUrl' },
            { path: 'courses.progressId', select: 'progressCourse' }
          ]
        });
      res.json({ user });
      
    } catch (err) {
      next(err);
    }

  } else {
    return next(errorHandler(401, 'Unauthorized'));
  }
}