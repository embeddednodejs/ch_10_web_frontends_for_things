var express = require('express');
var morgan = require('morgan')('dev');
var ecstatic = require('ecstatic');

// setup server
var app = express();
app.use(morgan);
app.use(ecstatic({ root: __dirname + '/static' }));
var port = 4000;

// setup board
var five = require('johnny-five');

// adapters
// var Edison = require('edison-io');
// var Galileo = require('galileo-io');
// var Beaglebone = require('beaglebone-io');

var board = new five.Board({
//    io: new Edison(),
    repl: false
});

board.on("ready", function() {
  var led = new five.Led(13);
  var slider = new five.Sensor("A1");
  led.blink(500);
  startupServer(slider);
});

function startupServer(slider) {
 
  // prepare server
  var server = app.listen(port);

  // sockets to push bytes
  var WebSocketServer = require('ws').Server;
  
  var wss = new WebSocketServer({server: server});
  
  wss.on('connection', function connection(ws) {
      console.log('websocket connected');
      ws.on('message', function incoming(message) {
        console.log('received: %s', message);
      });

      slider.scale([0, 100]).on("slide", function() {
        ws.send(JSON.stringify({data: this.value}));
      });
  });
  
  wss.on('close', function close() {
    console.log('disconnected');
  });
}
