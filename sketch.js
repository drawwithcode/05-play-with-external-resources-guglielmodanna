var beat;
var fft;

var vinyl;
var vinylReflection;

var purple;
var red;
var yellowOrange;
var Y_AXIS = 1;
var X_AXIS = 2;

var centerX;
var centerY;
var vinylRadius;
var startPointX;
var startPointY;

var ax = 0;
var ay = 0;
var bx = 0;
var by = 0;

var angle;
var speed = 1;

function preload() {
  beat = loadSound("assets/beat.mp3");
  vinyl = loadImage("assets/vinyl.png");
  vinylReflection = loadImage("assets/vinyl-reflection.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  frameRate(30);

  purple = color(131,58,180);
  red = color(253, 29, 29);
  yellowOrange = color(252, 176, 69);

  centerX = width / 2;
  centerY = height / 2;

  if (width > height) {
    vinylRadius = height / 2 - 50;
  } else {
    vinylRadius = width / 2 - 50;
  }

  beat.loop();
  fft = new p5.FFT();
  fft.setInput(beat);
}

function draw() {
  setGradient(0,0, width, height/2, purple, red, Y_AXIS);
  setGradient(0,height/2, width, height/2, red, yellowOrange, Y_AXIS);

  var spectrum = fft.analyze();

  noStroke();
  fill(255,255,255,100);
  beginShape();
  vertex(0,height);

  for (i = 0; i < spectrum.length; i++) {
    vertex(map(i, 0, spectrum.length, 0, width), map(spectrum[i], 0, 255, height, 0));
  }
  vertex(width,height);
  endShape();

  push();
  translate(centerX, centerY);
  if (mouseIsPressed) {
    rotate(angle);
  } else {
    rotate(frameCount);
  }
  image(vinyl, 0 - vinylRadius, 0 - vinylRadius, vinylRadius * 2, vinylRadius * 2);
  pop();
  image(vinylReflection, centerX - vinylRadius, centerY - vinylRadius, vinylRadius * 2, vinylRadius * 2);

  if (mouseIsPressed) {
    bx = mouseX - centerX;
    by = mouseY - centerY;

    var a = sqrt(pow(ax, 2) + pow(ay, 2));
    var b = sqrt(pow(bx, 2) + pow(by, 2));
    var abScal = ax * bx + ay * by;

    angle = acos(abScal / (a * b));

    if (angle !== angle) {
      angle = 90;
    }

    speed = map(angle, 0, 180, 0, 2);
    speed = constrain(speed, 0.01, 4);
  } else {
    speed = 1;
  }

  beat.rate(speed);
}

function mousePressed() {
  startPointX = mouseX;
  startPointY = mouseY;
  ax = startPointX - centerX;
  ay = startPointY - centerY;
}

function setGradient(x, y, w, h, c1, c2, axis) {

  noFill();

  if (axis == Y_AXIS) {  // Top to bottom gradient
    for (var i = y; i <= y+h; i++) {
      var inter = map(i, y, y+h, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x+w, i);
    }
  }
  else if (axis == X_AXIS) {  // Left to right gradient
    for (var i = x; i <= x+w; i++) {
      var inter = map(i, x, x+w, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y+h);
    }
  }
}
