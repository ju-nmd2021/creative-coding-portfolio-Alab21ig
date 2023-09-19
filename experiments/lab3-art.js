// Portfolio 2

let squaresAmount;
let squareSize = 200;
let xPosition = -squareSize;
let delay = -squareSize / 2;

function setup() {
  createCanvas(innerWidth, innerHeight);
  squaresAmount = height / squareSize;
}

function draw() {
  background(56, 142, 60);
  noStroke();
  fill(255, 245, 157);

  for (let i = 0; i < squaresAmount; i++) {
    square(xPosition + i * delay, i * squareSize, squareSize);
  }

  xPosition += 6;

  if (xPosition > width) {
    xPosition = -squareSize;
  }
}
