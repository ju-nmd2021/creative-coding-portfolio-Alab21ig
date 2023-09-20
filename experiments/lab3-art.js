// Portfolio 2

// Used this resaurse to read and understand more about tone.js https://tonejs.github.io/
//https://www.youtube.com/watch?v=SOVmo2IwbsI Showed interesting play with tone.js and showed how the triggerAttackRelease works
//The notes in order from Chatgpt https://chat.openai.com/share/8ae7436e-491b-4f02-b74a-5cee693ad94f

const notes = [
  "C4",
  "D4",
  "E4",
  "F4",
  "G4",
  "A4",
  "B4",
  "C#4",
  "D#4",
  "F#4",
  "G#4",
  "A#4",
];

let noteWidth = innerWidth / 5;

class MusicSquare {
  constructor(x, y, width, height, note) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.note = note;

    this.synth = new Tone.Synth().toDestination();
  }

  move() {
    this.x += 10;
    if (this.x > width) {
      this.x = -this.width;
      this.playNote();
    }
  }

  display() {
    fill(255, 245, 157);
    stroke(255, 204, 100);
    rect(this.x, this.y, this.width, this.height);
  }

  playNote() {
    this.synth.triggerAttackRelease(this.note, "8n");
  }
}

let squares = [];

function setup() {
  createCanvas(innerWidth, innerHeight);
  let noteHeight = height / 12;
  let startingX = -noteWidth;

  for (let i = 0; i < 12; i++) {
    let xPosition = startingX - i * noteWidth * 0.5;
    let square = new MusicSquare(
      xPosition,
      i * noteHeight,
      noteWidth,
      noteHeight,
      notes[i]
    );
    squares.push(square);
  }
}

function draw() {
  background(56, 142, 60);

  for (let square of squares) {
    square.display();
    square.move();
  }
}
