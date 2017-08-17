var socket = io();

socket.on("users", function(data) {
	$(".notifications-panel-body").prepend($("<p>").addClass("notifications").text(data));
	$(".notifications-panel-body").scrollTop(0);
});

socket.on("save article", function(data) {
	$(".notifications-panel-body").prepend($("<p>").addClass("notifications").text("Article Saved: \"" + data + "\""));
	$(".notifications-panel-body").scrollTop(0);
});

socket.on("delete article", function(data) {
	$(".notifications-panel-body").prepend($("<p>").addClass("notifications").text("Article Deleted: \"" + data + "\""));
	$(".notifications-panel-body").scrollTop(0);
});