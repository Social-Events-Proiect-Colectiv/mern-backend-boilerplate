const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/database_name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const database = mongoose.connection;

database.on('error', console.error.bind(console, 'connection error:'));
database.once('open', function () {
  console.log('Connected to MongoDB');
});

module.exports = database;
