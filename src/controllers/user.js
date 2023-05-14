const User = require('../models/userSchema');

exports.register = async (req, res) => {
  const { fname, lname, email, password } = req.body;
  try {
    const newUser = new User({ fname, lname, email, password, type: 'user' });
    await newUser.save();
    res.status(201).json({ message: 'User successfully registered' });
  } catch (err) {
    console.error(err);  // Log the entire error object
    res.status(500).json({ message: err.message });
  }
};