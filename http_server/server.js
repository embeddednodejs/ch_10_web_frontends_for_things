var express = require('express');
var morgan = require('morgan')('dev');
var ecstatic = require('ecstatic');
var jsonBody = require('body/json');

// setup server
var app = express();
app.use(morgan);
app.use(ecstatic({ root: __dirname + '/static' }));

app.post('/LED', function(req, res) {
  jsonBody(req, res, updateState)

  res.write('ok');
  res.end();
});

// setup board
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
  startupServer(led);
});

function startupServer(led) {
  // turn state of light
  function updateState(err, state) {
    if (err) {
      console.log(err);
    } else {
      state.led == 1 ? led.on() : led.off();
    }
  }

  app.listen(port);
}
