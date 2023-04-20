const Sample = require('../models/sample');

exports.getSamples = async (req, res) => {
  try {
    const samples = await Sample.find();
    res.json({ response: 'GET Example' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createSample = async (req, res) => {
  const sample = new Sample({
    title: req.body.title,
    description: req.body.description,
  });

  try {
    const newSample = await sample.save();
    res.status(201).json({ response: 'POST Example' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
