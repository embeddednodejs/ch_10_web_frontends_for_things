
var dnode = require('dnode');
var port = 4000;

var d = dnode.connect(port);
d.on('remote', function (remote) {
  remote.getState(function(data) {
    console.log(data);
  });
});
