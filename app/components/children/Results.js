var React = require("react");

var helpers = require("../utils/helpers");

var Results = React.createClass({
	handleClick: function(article) {
		var newArticle = {
			title: article.headline.main,
			author: article.byline.original,
			published: article.pub_date,
			url: article.web_url,
			snippet: article.snippet
		};
		helpers.save(newArticle).then(function() {
			console.log("Article successfuly saved!");
			socket.emit("save article", {title: newArticle.title});
			console.log("Updating search articles...");
			var searchResults = [];
			this.props.searchResults.forEach(function(result) {
				if (result.web_url !== newArticle.url) {
					searchResults.push(result);
				}
			});
			this.props.setSearchResults(searchResults);
		}.bind(this, article));
	},
	render: function() {
		return (
			<div>

				<div className="panel panel-default">
					<div className="panel-heading"><strong><i className="fa fa-list-alt" aria-hidden="true"></i> Results</strong></div>
					<div className="panel-body">
						{this.props.searchResults.map(function(result, i) {
							return (
								<div className="well well-lg" key={i}>
									<div className="col-md-9 col-sm-9">
										<a href={result.web_url} target="_blank"><h3 className="article-title">{result.headline.main}</h3></a>
										<p><span className="article-author">{result.byline.original}</span> <span className="article-date">{moment(result.pub_date).format("MMMM D, YYYY")}</span></p>
										<p className="article-snippet">{result.snippet}</p>
									</div>
									<div className="col-md-3 col-sm-3">
										<button className="btn btn-default save-article" onClick={this.handleClick.bind(this, result)}><i className="fa fa-bookmark" aria-hidden="true"></i> SAVE</button>
									</div>
								</div>
							);
						}, this)}
					</div>
				</div>

			</div>
		);
	}
});

module.exports = Results;