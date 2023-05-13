const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.post('/pages/register', userController.register);

module.exports = router;
