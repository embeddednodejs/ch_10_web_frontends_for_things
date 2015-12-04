var rSlider, gSlider, bSlider;

var socket = io();

function setup() {
  // create canvas
  createCanvas(710, 400);
  textSize(15)
  noStroke();


  // create sliders
  rSlider = createSlider(0, 255, 100);
  rSlider.position(20, 20);
  gSlider = createSlider(0, 255, 0);
  gSlider.position(20, 50);
}

function draw() {
  var speed = rSlider.value();
  var turn = gSlider.value();
  background(turn, speed, 100);
  socket.emit('color', JSON.stringify({r: turn, g: speed, b: 100}));

  text("speed", 165, 35);
  text("turn", 165, 65);
}

