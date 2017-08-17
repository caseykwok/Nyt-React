var React = require("react");
var ReactRouter = require("react-router-dom");
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;

var Saved = require("./children/Saved");
var Search = require("./children/Search");
var History = require("./children/History");

var helpers = require("./utils/helpers");

var Main = React.createClass({
	getInitialState: function() {
		return {
			topic: "",
			startDate: "",
			endDate: "",
			searchResults: [],
			savedResults: []
		};
	},
	componentDidUpdate: function(prevProps, prevState) {
		console.log("Main Component Updated!");
		// console.log("Previous Topic: " + prevState.topic);
		// console.log("Current Topic: " + this.state.topic);
		// console.log(prevState.topic !== this.state.topic);
		if (prevState.topic !== this.state.topic || prevState.startDate !== this.state.startDate || prevState.endDate !== this.state.endDate) {
			helpers.runSearch(this.state.topic, this.state.startDate, this.state.endDate).then(function(results) {
				// console.log("API Response: ", results);
				var searchResults = [];
				// console.log("Results Returned By AJAX: ", results.data.response.docs);
				// console.log("Current Results: ", this.state.results);
				// console.log(results.data.response.docs !== this.state.results);
				if (results.data.response.docs !== this.state.results) {
					(results.data.response.docs).forEach(function(result) {
						if (result.document_type === "article") {
							searchResults.push(result);
						}
					})
					this.setState({
						searchResults: searchResults
					});
					// console.log("Updated Search Results: ", searchResults);
				}
			}.bind(this));
		}
	},
	setParams: function(topic, startDate, endDate) {
		this.setState({
			topic: topic,
			startDate: startDate,
			endDate: endDate
		});		
	},
	setSavedResults: function(results) {
		console.log("Setting new saved results... ", results);
		this.setState({
			searchResults: [],
			savedResults: results
		});		
	},
	setSearchResults: function(results) {
		console.log("Setting new search results... ", results);
		this.setState({
			searchResults: results
		})
	},
	render: function() {
		return (
			<div>

				<nav className="navbar navbar-default navbar-fixed-top">
					<div className="container-fluid">
						<div className="navbar-header">
							<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
								<span className="sr-only">Toggle navigation</span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
							</button>
							<Link className="navbar-brand" to="/">New York Times Search</Link>
						</div>
						<div id="navbar" className="navbar-collapse collapse">
							<ul className="nav navbar-nav navbar-right">
								<li><Link to="/"><i className="fa fa-search" aria-hidden="true"></i> Search</Link></li>
								<li><Link to="saved"><i className="fa fa-bookmark" aria-hidden="true"></i> Saved Articles</Link></li>
							</ul>
						</div>
					</div>
				</nav>

				<div className="jumbotron jumbotron-fluid text-center">
					<div className="container">
						<h1><i className="fa fa-newspaper-o" aria-hidden="true"></i> New York Times Search</h1>
						<p className="lead">| Search & Save Articles |</p>
					</div>
				</div>

				<div className="container">
							
					<Route exact path="/" render={(props) => (
						<Search {...props} setParams={this.setParams} setSearchResults={this.setSearchResults} searchResults={this.state.searchResults}/>
					)}/>

					<Route exact path="/saved" render={(props) => (
						<Saved {...props} setSavedResults={this.setSavedResults} savedResults={this.state.savedResults}/>
					)}/>

					<div className="col-md-4">
						<History />
					</div>

				</div>

			</div>
		);
	}
});

module.exports = Main;