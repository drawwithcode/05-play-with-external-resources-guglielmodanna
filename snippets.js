
if (this.x > mouseX) {
  xDir = xDir * -1;
}
if (this.y > mouseY) {
  yDir = yDir * -1;
}

this.x += this.speed * cos(angle) * xDir;
this.y += this.speed * sin(angle) * yDir;

/*var japanRed = [199,0,37];
var ball = {};

function setup() {
    createCanvas(300, 400);
    ball = new Ball(20, 20, 20);
}

function draw() {
  background(200);
  ball.move();
}


function Ball(x, y, diameter) {

  this.size = diameter;
  this.x = x;
  this.y = y;

  this.color = japanRed;
  this.speed = 5;

  var yDir = 1;
  var xDir = 1;

  // Methods
  this.move = function() {
    if (this.y > height - this.size/2 || this.y < this.size/2) {
      yDir = yDir * -1;
    }
    if (this.x > width - this.size/2 || this.x < this.size/2) {
      xDir = xDir * -1;
    }

     this.x += this.speed * xDir;
     this.y += this.speed * yDir;
     this.display();
  }

  this.display = function() {
    fill(this.color);
    ellipseMode(RADIUS);
    ellipse(this.x, this.y, this.size);
  }
}*/
