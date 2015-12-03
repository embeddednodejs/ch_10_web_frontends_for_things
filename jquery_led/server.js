var express = require('express');
var morgan = require('morgan')('dev');
var ecstatic = require('ecstatic');
var jsonBody = require('body/json');

// setup server
var app = express();
app.use(morgan);
app.use(ecstatic({ root: __dirname + '/static' }));

// setup board
var five = require('johnny-five');

// adapters
// var Edison = require('edison-io');
// var Galileo = require('galileo-io');
// var Beaglebone = require('beaglebone-io');

var port = 4000;

// instantiate board
var board = new five.Board({
    // add different adapter if needed
    // io: new Edison(),
    repl: false
});

var LED=13;
board.on('ready', function() {
  var led = new five.Led(LED);
  led.on();
  board.wait(100, function() {
    led.off();
  });

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

  app.post('/LED', function(req, res) {
    jsonBody(req, res, updateState)
  
    res.writeHead(200);
    res.write('ok');
    res.end();
  });

  app.listen(port);
}
