var React = require("react");

var History = React.createClass({
	render: function() {
		return (
			<div className="panel panel-default notifications-panel">
				<div className="panel-heading"><strong><i className="fa fa-users" aria-hidden="true"></i> Notifications</strong></div>
				<div className="panel-body notifications-panel-body"></div>
			</div>
		);
	}
});

module.exports = History;