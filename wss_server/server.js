var http = require('http');
var port = 4000;
var five = require('johnny-five');
var Edison = require('edison-io');

var board = new five.Board({
    io: new Edison()
});

board.on("ready", function() {
  var led = new five.Led(13);
  led.blink(500);
  startupServer();
});

function startupServer() {
  // sockets to push bytes
  var WebSocketServer = require('ws').Server;
  
  // prepare server
  var server = http.createServer(function (req, res) {
    res.write('ok');
    res.end();
  }).listen(port);
  
  
  var wss = new WebSocketServer({server: server});
  
  wss.on('connection', function connection(ws) {
      console.log('websocket connected');
      ws.on('message', function incoming(message) {
        console.log('received: %s', message);
      });
  
    setInterval(function() {
      ws.send(JSON.stringify({message: 'ping'}));
    }, 1500);
  
  });
  
  wss.on('close', function close() {
    console.log('disconnected');
  });
}
