const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cors = require('cors');
const sampleRoutes = require('./routes/sample');
const userRoutes = require('./routes/user');

const app = express();
app.use(cors());
const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Parse JSON request bodies
app.use(express.json());

// Apply routes
app.use('/', userRoutes);

const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://danthecol:asd123@cluster0.f14vrrm.mongodb.net/?retryWrites=true&w=majority";

async function run() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");

    const collection = client.db("Users").collection("Users"); // Replace "DATABASE_NAME" with your actual database name
    const data = await collection.find({}).toArray();
    console.log(data);
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
