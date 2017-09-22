var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var poemSchema = new Schema({
	userId: String,
	numberOfReads: Number,
	title: String, 
	description: String,
	poet: String,
	language: String,
	coverArt: String,
	releaseDate: String,
	explicitContent: Boolean
})

var Poem = mongoose.model('Poem', poemSchema);

module.exports = Poem;