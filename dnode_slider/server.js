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

// board adapters
// var Edison = require('edison-io');
// var Galileo = require('galileo-io');
// var Beaglebone = require('beaglebone-io');

var board = new five.Board({
    repl: false
});

board.on("ready", function() {
  var led = new five.Led(13);
  var slider = new five.Sensor("A1");
  led.blink(500);
  startupServer(slider);
});

function startupServer(slider) {
  var dnode = require('dnode');
  var shoe = require('shoe');
  var server = app.listen(port);

  var lastValue;
  slider.on('slide', function(d) {
    lastValue = d;
  });

  /*
  var sock = shoe(function(conn) {
    conn.write(lastValue);
    conn.on('end', function() {
    });
  });
  */

  var sock = shoe(function(stream) {
    var d = dnode({
      getState: function(cb) {
        cb(lastValue);
      }
    });
    d.pipe(stream).pipe(d);
  });
  sock.install(server, '/slider');

  server.listen(port);
}
