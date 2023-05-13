const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://danthecol:asd123@cluster0.f14vrrm.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const database = mongoose.connection;

database.on('error', console.error.bind(console, 'connection error:'));
database.once('open', function () {
  console.log('Connected to MongoDB');
});

module.exports = database;
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://danthecol:asd123@cluster0.f14vrrm.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongomataaDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}run().catch(console.dir);
