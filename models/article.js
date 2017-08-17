var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var articleSchema = new Schema({
	title: String,
	author: String,
	published: Date,
	url: String,
	snippet: String,
	createdAt: {
		type: Date,
		default: Date.now
	}
});

var Article = mongoose.model("article", articleSchema);

module.exports = Article;