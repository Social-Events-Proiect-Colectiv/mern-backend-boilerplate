const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const userRoutes = require('./routes/user');
const eventRoutes = require('./routes/event');

const mongoose = require('mongoose');

const app = express();
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Apply routes
app.use('/', userRoutes);
app.use('/', eventRoutes);


const uri = "mongodb+srv://danthecol:asd123@cluster0.f14vrrm.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Connected to MongoDB Atlas");
  const port = 5000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
})
.catch((error) => {
  console.error("Error connecting to MongoDB Atlas:", error);
});
