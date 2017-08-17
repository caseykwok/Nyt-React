var mongoose = require("mongoose");
// Set promise provider to bluebird
mongoose.Promise = require("bluebird");

// Use Express to initialize server
var express = require("express");
var app = express();
var PORT = process.env.PORT || 3000;

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Access static files
var path = require("path");
app.use(express.static(path.join(__dirname, "/public")));

var logger = require("morgan");
app.use(logger("dev"));

var databaseUri = "mongodb://localhost/nyt-react";
if (process.env.MONGODB_URI) {
	// Executes if this is being executed in Heroku
	mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });
} else {
	// Executes if this is being executed on local machine
	mongoose.connect(databaseUri, { useMongoClient: true });
}

var db = mongoose.connection;

// Show any Mongoose errors
db.on("error", function(err) {
	console.log("Mongoose Error: ", err);
});

// Once logged in to the database through Mongoose, log a success message
db.once("open", function() {
	console.log("Mongoose connection successful.");
});

// Import routes and allow server to access them
var routes = require("./controllers/routes");
app.use("/", routes);

var server = app.listen(PORT, function() {
	console.log("App listening on PORT " + PORT);
});

var io = require("socket.io")(server);

// io represents the group of sockets
// Second parameter gives a socket variable every time a new connection is made (i.e. create a socket variable for each connection established)
// The socket variable is only for communicating with each individual connection

// ======================================================
// List of Ways to Emit Messages to Different Sockets
// ======================================================
/* 
socket.emit('message', "this is a test"); //sending to sender-client only
socket.broadcast.emit('message', "this is a test"); //sending to all clients except sender
socket.broadcast.to('game').emit('message', 'nice game'); //sending to all clients in 'game' room(channel) except sender
socket.to('game').emit('message', 'enjoy the game'); //sending to sender client, only if they are in 'game' room(channel)
socket.broadcast.to(socketid).emit('message', 'for your eyes only'); //sending to individual socketid
io.emit('message', "this is a test"); //sending to all clients, include sender
io.in('game').emit('message', 'cool game'); //sending to all clients in 'game' room(channel), include sender
io.of('myNamespace').emit('message', 'gg'); //sending to all clients in namespace 'myNamespace', include sender
socket.emit(); //send to all connected clients
socket.broadcast.emit(); //send to all connected clients except the one that sent the message
socket.on(); //event listener, can be called on client to execute on server
io.sockets.socket(); //for emiting to specific clients
io.sockets.emit(); //send to all connected clients (same as socket.emit)
io.sockets.on() ; //initial connection from a client. 
*/ 

io.on("connection", function(socket) {
	console.log("a user connected");
	// Sending to all clients except sender
	// Emit an event to the socket identified by the string name "users"
	socket.broadcast.emit("users", "Guest has joined the room.");

	// Listening for the "disconnect" event
	socket.on("disconnect", function() {
		console.log("user disconnected");
		// Emit an event to the socket identified by the string name "users"
		io.emit("users", "Guest has left the room.");
	});

	// Listening for the "save article" event
	socket.on("save article", function(data) {
		console.log("Title: ", data.title);
		// Emit an event to the socket identified by the string name "save article"
		io.emit("save article", data.title);
	});

	// Listening for the "delete article" event
	socket.on("delete article", function(data) {
		console.log("Title: ", data.title);
		// Emit an event to the socket identified by the string name "delete article"
		io.emit("delete article", data.title);
	});
});


