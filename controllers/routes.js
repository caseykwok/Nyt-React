var express = require("express");
var router = express.Router();
var path = require("path");

var Article = require("../models/article");

router.get("/api/saved", function(req, res) {
	console.log("Retrieving saved articles...");
	Article.find({}, function(err, data) {
		if (err) {
			console.log("Error: ", err);
		} else {
			res.send(data);
		}
	});
});

router.post("/api/saved", function(req, res) {
	console.log("Saving article...");
	console.log("Request to save article... ", req.body);

	// console.log("Author..." + req.body.author);
	// console.log(!req.body.author);
	if (!req.body.author) {
		req.body.author = "By N/A"
		console.log("Updated req.body: ", req.body);
	}

	var article = new Article(req.body);
	article.save(function(err, newArticle) {
		if (err) {
			console.log("Error: ", err);
		} else {
			console.log("Article saved!");
			console.log("New Article Added: ", newArticle);
			res.send(newArticle);
		}
	});

	// Don't allow duplicate articles saved in database
	// var promise = Article.findOne(req.body).exec();
	// promise.then(function(result) {
	// 	if (!result) {
	// 		var article = new Article(req.body);
	// 		article.save(function(err, newArticle) {
	// 			if (err) {
	// 				console.log("Error: ", err);
	// 			} else {
	// 				console.log("Article saved!");
	// 				console.log("New Article Added: ", newArticle);
	// 				res.send(newArticle);
	// 			}
	// 		});
	// 	} else {
	// 		console.log("Article exists already!");
	// 		res.send();
	// 	}
	// });
});

router.delete("/api/saved", function(req, res) {
	console.log("Deleting article...");
	console.log("Request to delete article... ", req.body);
	Article.remove(req.body, function(err, doc) {
		if (err) {
			console.log("Error: ", err);
		} else {
			console.log("Article deleted!");
			res.send(doc);
		}
	});
});

router.get("*", function(req, res) {
	res.sendFile(path.resolve(__dirname, "../public/index.html"));
});

module.exports = router;