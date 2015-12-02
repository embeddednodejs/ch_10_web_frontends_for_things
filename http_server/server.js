var express = require('express');
var morgan = require('morgan')('dev');
var ecstatic = require('ecstatic');
var app = express();
app.use(morgan);
app.use(ecstatic);


var five = require('johnny-five');
var Edison = require('edison-io');

var port = 4000;

var board = new five.Board({
    io: new Edison(),
    repl: false
});

board.on('ready', function() {
  var led = new five.Led(5);
  led.blink(500);
  startupServer();
});

function startupServer() {

  app.listen(port, '127.0.0.1');
}
