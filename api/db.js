var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/api');

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    review: [{
        airline: String,
        rating: String,
        obs: String
    }]

}, { collection: 'usercollection' }
);
module.exports = { Mongoose: mongoose, UserSchema: userSchema }
