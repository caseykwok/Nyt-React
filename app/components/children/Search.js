var React = require("react");

var Results = require("./Results.js");

var Search = React.createClass({
	getInitialState: function() {
		return {
			topic: "",
			startDate: "",
			endDate: ""
		};
	},
	handleChange: function(event) {
		var newState = {};
		newState[event.target.id] = event.target.value;
		this.setState(newState);
	},
	handleSubmit: function(event) {
		event.preventDefault();
		this.props.setParams(this.state.topic, this.state.startDate, this.state.endDate);
		this.setState({
			topic: "",
			startDate: "",
			endDate: ""
		});
	},
	render: function() {
		return (

			<div className="col-md-8">

				<div className="panel panel-default">
					<div className="panel-heading"><strong><i className="fa fa-search" aria-hidden="true"></i> Search</strong></div>
					<div className="panel-body">
						<form onSubmit={this.handleSubmit}>
							<div className="form-group">
								<label htmlFor="topic">Topic:</label>
								<input 
									value={this.state.topic} 
									type="text" 
									className="form-control" 
									id="topic" 
									onChange={this.handleChange} 
									required
								/>
							</div>
							<div className="form-group">
								<label htmlFor="startDate">Start Date:</label>
								<input 
									value={this.state.startDate} 
									type="date" 
									className="form-control" 
									id="startDate" 
									onChange={this.handleChange}
									required
								/>
							</div>
							<div className="form-group">
								<label htmlFor="endDate">End Date:</label>
								<input 
									value={this.state.endDate} 
									type="date" 
									className="form-control" 
									id="endDate" 
									onChange={this.handleChange}
								/>
							</div>
							<button type="submit" className="btn btn-default" id="submit-search">SEARCH</button>
						</form>
					</div>
				</div>

				<Results 
					searchResults={this.props.searchResults}
					setSearchResults={this.props.setSearchResults}
				/>

			</div>

		);
	}
});

module.exports = Search;