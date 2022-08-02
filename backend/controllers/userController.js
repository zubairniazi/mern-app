const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(user._id);

    res.status(200).json({
      message: 'User logged in successfully.',
      data: { token, email: user.email },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.register(email, password);

    const token = createToken(user._id);

    res.status(200).json({
      message: 'User registered successfully.',
      data: { token, email: user.email },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { login, register };
