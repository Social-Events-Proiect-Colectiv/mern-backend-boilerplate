const express = require('express');
const database = require('./config/database');
const sampleRoutes = require('./routes/sample');

const app = express();
app.use(express.json());
app.use('/', sampleRoutes);

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
``;
