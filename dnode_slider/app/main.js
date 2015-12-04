var shoe = require('shoe');

// var through = require('through');
var dnode = require('dnode');

var result = document.getElementById('result');
var stream = shoe('/slider');

/* 
stream.pipe(through(function (msg) {
    result.appendChild(document.createTextNode(msg));
})).pipe(stream);
*/

var d = dnode();
d.on('remote', function (remote) {
  remote.getState(function(msg) {
    result.appendChild(document.createTextNode(msg));
  })
});
d.pipe(stream).pipe(d);

