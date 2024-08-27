const User = require('../models/User');
const tokenBlacklist = require('../models/tokenBlacklist');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Inscription d'un nouvel utilisateur
/**
 * Handles user signup by validating email and password fields, checking for existing users,
 * hashing the password, and saving the new user to the database.
 * 
 * @param {Object} req - The request object containing user data in the body
 * @param {Object} res - The response object to send back the result
 * @param {Function} next - The next middleware function
 * @returns {Object} JSON response indicating success or failure of user creation
 */
exports.signup = async (req, res, next) => {
  const { name, email, password } = req.body;

   // Validate email and password fields
  if (!validateEmail(email) || !validatePassword(password) || !name) {
    return res.status(400).json({ message: 'Invalid name, email or password format' });
  }

  try {
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: 'Unable to create an account with this email' });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hash
    });

    await user.save();
    return res.status(201).json({ message: 'New user created' });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// Email validation function
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Password validation function
function validatePassword(password) {
  // Example criteria: at least 8 characters, at least one number, one special character
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}

// Connextion d'un ancien utilisateur
/**
 * Asynchronous function to handle user login.
 * Validates the input email and password.
 * Checks if the user exists and verifies the password.
 * Generates a JWT token with user details and expiration time.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} JSON response with user ID and JWT token.
 */
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // Input validation for email and password
  if(!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  
  try {
    const user = await User.findOne({ email });

    if(!user) {
      res.status(401).json({ message: 'Incorrect username/password pair'});

    }
    // on compare le hash du pwd envoyer par le user et celui dans la DB

    const valid = await bcrypt.compare(password, user.password);

    if(!valid) {
      res.status(401).json({ message: 'Incorrect username/password pair' });

    }

    // Ensure 'iat' claim in JWT token
    res.status(200).json({
      userId: user._id,
      token: jwt.sign(
        { userId: user._id, role: user.role, iat: Math.floor(Date.now() / 1000) },
        process.env.JWT_SECRET,
        { expiresIn: '6h' }
      )
    })

  } catch(error) {
    console.error(`Error during login: ${error}`);
    res.status(500).json({ message: 'An error occurred during login' });
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
      console.log(`User ${req.user.username} logged out at ${new Date()}`);
      // Invalidate the token by adding it to the blacklist
      const token = req.header('x-auth-token');
      await tokenBlacklist.create({ token });

      res.status(200).json({ message: `Logout successful` });

    } catch (error) {
      res.status(500).json({error});
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

  if (!req || !req.body || !req.user) {
    return res.status(400).json({ message: 'Invalid request data' });
  }

  try {
    const user = await User.findById(req.user.id);
    res.json(user);
    
  } catch (err) {
    res.status(500).json({ err: 'Internal Server Error' });
  }
}