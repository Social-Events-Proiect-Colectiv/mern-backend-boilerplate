const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const userController = require('../controllers/user');
const User = require('../models/userSchema');
const nodemailer= require('nodemailer');

router.post('/register', userController.register);
router.post('/reset/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });

    if (!user) {
      return res.status(400).json({ message: 'Password reset token is invalid or has expired' });
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ message: 'Password has been reset' });
  } catch (error) {
    console.error('Error during password reset:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'No account with that email found' });
    }

    // Create reset token and set expiration
    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetPasswordExpires = Date.now() + 3600000; // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetPasswordExpires;

    await user.save();

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'YOUR_GMAIL_ACCOUNT',
        pass: 'YOUR_GMAIL_PASSWORD',
      },
    });

    const mailOptions = {
      to: user.email,
      from: 'passwordreset@demo.com',
      subject: 'Node.js Password Reset',
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
      Please click on the following link, or paste this into your browser to complete the process:\n\n
      http://localhost:3000/reset/${resetToken}\n\n
      If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error sending password reset email' });
      }

      res.status(200).json({ message: 'Password reset email sent' });
    });
  } catch (error) {
    console.error('Error during forgot password:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

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
