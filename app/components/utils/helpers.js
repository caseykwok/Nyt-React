var axios = require("axios");

var helper = {
	runSearch: function(topic, startDate, endDate) {
		console.log("Topic: " + topic);
		console.log("Start Year: " + startDate);
		console.log("End Year: " + endDate);

		// Default to today as end date if user does not input end date
		if (!endDate) {
			endDate = moment().format("YYYYMMDD");
		} else {
			endDate = endDate.split("-").join("");
		}

		// Construct query URL
		var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
		url += "?" + $.param({
			"api-key": "1c182fe47b824bbb8fc1c38bbf0b78b7",
			"q": topic,
			"begin_date": startDate.split("-").join(""),
			"end_date": endDate
		});
		console.log("Query URL: " + url);

		return axios.get(url)
			.then(function(response) {
				console.log("Response: ", response);
				return response;
			})
			.catch(function(error) {
				console.log("Error: ", error);
				return error;
			});
	},
	getSaved: function() {
		return axios.get("/api/saved");
	},
	save: function(article) {
		return axios.post("/api/saved", article);
	},
	removeSaved: function(article) {
		// Must specific { data: article } and access it in routes as req.body
		// Alternatively, specify { params: article } and access it in routes as req.params
		return axios.delete("/api/saved", { data: article });
	}
};

module.exports = helper;