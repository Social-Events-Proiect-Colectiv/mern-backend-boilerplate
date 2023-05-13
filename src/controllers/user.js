const User = require('../models/userSchema');

exports.register = async (req, res) => {
  const { fname, lname, email, password } = req.body;
  try {
    const newUser = new User({ fname, lname, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User successfully registered' });
  } catch (err) {
    res.status(500).json({ message: err.message + 'pulamea'});
  }
};
