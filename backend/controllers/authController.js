// controllers/authController.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

function signToken(user) {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is missing. Add it to your .env file.');
  }

  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

exports.register = async (req, res) => {
  try {
    const { username, email, password, profilePic } = req.body;
    console.log('PROFILE PIC FROM CLIENT:', profilePic);

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'username, email, password are required' });
    }

    // Never trust role from client
    const exists = await User.findOne({ $or: [{ email }, { username }] });
    if (exists) {
      return res.status(409).json({ message: 'User already exists (email/username taken)' });
    }

    const user = await User.create({ username, email, password, profilePic }); // password hashed by pre-save
    const token = signToken(user);

    return res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        profilePic: user.profilePic,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: 'Register failed', error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({ message: 'identifier and password are required' });
    }

    const ident = String(identifier).trim();

    // Find by email OR username
    const user = await User.findOne({
      $or: [{ email: ident.toLowerCase() }, { username: ident }],
    }).select('+password');

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const ok = await user.comparePassword(password);
    if (!ok) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = signToken(user);

    return res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        profilePic: user.profilePic,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: 'Login failed', error: err.message });
  }
};
