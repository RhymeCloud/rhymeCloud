var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
	email: String,
	password: String,
	firstName: String,
	lastName: String,
	dob: String,
	city: String,
	favourites: String
})

var User = mongoose.model('User', userSchema);

module.exports = User;