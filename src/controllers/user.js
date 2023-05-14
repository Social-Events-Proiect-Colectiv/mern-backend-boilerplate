const User = require('../models/userSchema');
const nodemailer = require('nodemailer');
const crypto = require('crypto')

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
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'your-email@gmail.com',
        pass: 'your-password',
      },
    });

    const mailOptions = {
      to: user.email,
      from: 'your-email@gmail.com',
      subject: 'Password Reset',
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
      Please click on the following link, or paste this into your browser to complete the process:\n\n
      http://localhost:3000/reset/${resetToken}\n\n
      If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error sending email' });
      }
      res.status(200).json({ message: 'Password reset email sent' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};