const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const User = require('../models/userSchema');

router.post('/register', userController.register);
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Authentication successful
    res.status(200).json({ message: 'Login successful', type: user.type });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
