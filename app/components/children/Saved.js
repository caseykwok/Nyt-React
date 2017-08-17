var React = require("react");

var helpers = require("../utils/helpers");

var Saved = React.createClass({
	componentDidMount: function() {
		console.log("Saved Component Mounted!");
		helpers.getSaved().then(function(results) {
			console.log("Saved: ", results);
			if (results !== this.props.savedResults) {
				this.props.setSavedResults(results.data);
			}
		}.bind(this));
	},
	handleClick: function(article) {
		var removeArticle = {
			"_id": article._id
		};
		console.log("Article: ", removeArticle);
		helpers.removeSaved(removeArticle).then(function() {
			console.log("Article unsaved and removed from database!");
			socket.emit("delete article", {title: article.title});
			console.log("Updating saved articles...");
			helpers.getSaved().then(function(results) {
				console.log("Saved: ", results);
				if (results !== this.props.savedResults) {
					this.props.setSavedResults(results.data);
				}
			}.bind(this));
		}.bind(this, article));
	},
	render: function() {
		return (

			<div className="col-md-8">

				<div className="panel panel-default">
					<div className="panel-heading"><strong><i className="fa fa-list-alt" aria-hidden="true"></i> Results</strong></div>
					<div className="panel-body">
						{this.props.savedResults.map(function(result, i) {
							return (
								<div className="well well-lg" key={i}>
									<div className="col-md-10 col-sm-9">
										<a href={result.url} target="_blank"><h3 className="article-title">{result.title}</h3></a>
										<p><span className="article-author">{result.author}</span> <span className="article-date">{moment(result.published).format("MMMM D, YYYY")}</span></p>
										<p className="article-snippet">{result.snippet}</p>
									</div>
									<div className="col-md-2 col-sm-3">
										<button className="btn btn-default trash-article" data-id={result._id} onClick={this.handleClick.bind(this, result)}><i className="fa fa-trash" aria-hidden="true"></i> TRASH</button>
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

module.exports = Saved;