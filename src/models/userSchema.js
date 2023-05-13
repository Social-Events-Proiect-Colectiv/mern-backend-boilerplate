const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
 fname:String,
 lname:String,
 email:String,
 password:String,
 type:String,
}
);

const Users = mongoose.model('Users', userSchema);

module.exports = Users;
