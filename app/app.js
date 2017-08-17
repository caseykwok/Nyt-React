var React = require("react");
var ReactDOM = require("react-dom");
var ReactRouter = require("react-router-dom");
var BrowserRouter = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;

var Main = require("./components/Main");

ReactDOM.render((
	<BrowserRouter>
		<Route component={Main} />
	</BrowserRouter>
), document.getElementById("app"));