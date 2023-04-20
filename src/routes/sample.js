const express = require('express');
const router = express.Router();
const sampleController = require('../controllers/sample');

router.get('/', sampleController.getSamples);
router.post('/', sampleController.createSample);

module.exports = router;
