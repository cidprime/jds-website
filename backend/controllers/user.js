const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Inscription d'un nouvel utilisateur
exports.signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  // On hash le mot de passe donne par l'utilisateur
  try {
    const userExist = User.findOne({ email });

    if(userExist) {
      res.status(400).json({ message: 'Unable to create an account with this email' });

    }
    const hash = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hash
    });

    await user.save();
    res.status(201).json({message: 'New user create'})

  } catch(error) {
    res.status(500).json({error});

  }
}

// Connextion d'un ancien utilisateur
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  
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
    res.status(200).json({
      userId: user._id,
      token: jwt.sign(
        { userId: user._id, role: user.role },
        'RANDOM_SECRET_TOKEN',
        { expiresIn: '10h' }
      )
    })

  } catch(error) {
    res.status(500).json({error});

  }
}