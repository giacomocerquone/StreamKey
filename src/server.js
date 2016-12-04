function server() {
  var app   = require('http').createServer(handler);
  var io    = require('socket.io')(app);
  var fs    = require('fs');
  var robot = require('robotjs');
  var specialKeys = {
    ctrl: "control",
    meta: "alt",
    shift: "shift"
  };
  var connectedClientIP = "";

  app.listen(3000);
  console.log("Listening on 3000");

  function handler(req, res) {
      res.writeHead(200);
      res.end("<div style='text-align:center'><h1>Streaming Keyboard is working!</h1><p>By Giacomo Cerquone</p></div>");
  }

  io.on('connection', function(socket) {
    connectedClientIP = socket.handshake.address;
    console.log("Coupled with " + connectedClientIP);

    socket.on('keypressed', function(data) {
      console.log(data);
      if(data.key.name) {
        var modifiers = Object.keys(data.key).map(property => data.key[property] === true);
        robot.keyTap(data.key.name, modifiers);
      } else {
        robot.typeString(data.key); // Should use keyTap but it's bugged for special chars with accents etc.
      }
    });

    socket.on('disconnect', function(data) {
      // clear the output of the console
      console.log('\x1Bc');
      console.log(connectedClientIP + ' disconnected', "\nWaiting for a request...");
    });

  });
}

module.exports = server;
