function client(ip) {
  var socket = require('socket.io-client')('http://' + ip + ':3000', { reconnect: true });
  console.log(ip);
  var keypress = require('keypress')(process.stdin);

  socket.on('connect', function (socket) {
      console.log('Coupled with server');
  });

  process.stdin.on('keypress', function (ch, key) {
    if( key && ( (key.ctrl || key.shift || key.meta) || key.sequence === "\b" || !ch) ) {
      console.log(key);
      socket.emit('keypressed', { key: key } );
    } else {
      console.log(ch);
      socket.emit('keypressed', { key: ch } );
    }

    // ALT+BACKSPACE to close the app
    if (key && key.meta && key.name == 'backspace') {
      process.exit(1);
    }
  });

  socket.on('disconnect', function() {
    // clear the output of the console
    console.log('\x1Bc');
    console.log('Server disconnected', "\nTrying to reconnect...");
  });

  process.stdin.setRawMode(true);
}

module.exports = client;
