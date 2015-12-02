var express = require('express');
var morgan = require('morgan')('dev');
var ecstatic = require('ecstatic');
var jsonBody = require('body/json');

// setup server
var app = express();
app.use(morgan);
app.use(ecstatic({ root: __dirname + '/static' }));

// turn state of light
app.post('/LED', function(req, res) {
  var payload = jsonBody(req, res, send)

  console.log(payload);
  res.write('ok');
  res.end();
});


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
  app.listen(port);
}
