var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", function(socket) {
  let room = socket.handshake.query.room;
  let user = socket.handshake.query.user || "guest";

  if (!user || !room) {
    socket.disconnect(true);
  } else {
    socket.join(room);

    socket.on("new-message-entered", function newMessageEntered(data) {
      console.log("new user message");
      io
        .to(room)
        .emit(
          "new-message",
          Object.assign(data, { user, time: new Date().toISOString() })
        );
    });

    socket.on("disconnect", function(data) {
      console.log("use disconnected");
      socket.leave(room);
      io
        .to(room)
        .emit(
          "user-disconnect",
          Object.assign(data, { user, time: new Date().toISOString() })
        );
    });
  }
});

http.listen(3100, function() {
  console.log("listening on *:3000");
});
