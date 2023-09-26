// Lab 4
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
//

let musicSquareWidth = innerWidth / 5;

let color = {
  r: Math.floor(Math.random() * 256),
  g: Math.floor(Math.random() * 256),
  b: Math.floor(Math.random() * 256),
};

let complementaryColor = {
  r: 255 - color.r,
  g: 255 - color.g,
  b: 255 - color.b,
};

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y + random(-20, 20);
    this.color = color;
    this.alpha = 255;
    this.size = random(6, 12);
    this.velocity = {
      x: random(-1, 1),
      y: random(-1, 1),
    };
  }

  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.alpha -= 7;
  }

  display() {
    noStroke();
    fill(this.color.r, this.color.g, this.color.b, this.alpha);
    ellipse(this.x, this.y, this.size);
  }
}

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
    push();
    strokeWeight(3);
    stroke(color.r * 0.8, color.g * 0.8, color.b * 0.8);
    fill(color.r, color.g, color.b);
    rect(this.x, this.y, this.width, this.height);
    pop();
  }

  generateParticles() {
    let particles = [];
    for (let i = 0; i < 3; i++) {
      let p = new Particle(this.x, this.y + random(this.height), {
        r: color.r * 1.2,
        g: color.g * 1.2,
        b: color.b * 1.2,
      });
      particles.push(p);
    }
    return particles;
  }

  playNote() {
    this.synth.triggerAttackRelease(this.note, "8n");
  }
}

let squares = [];
let particleArray = [];

function setup() {
  createCanvas(innerWidth, innerHeight);

  let noteHeight = height / 12;
  let startingX = -musicSquareWidth;

  let notesOrder = [];
  for (let i = 0; i < 12; i++) {
    notesOrder.push(i);
  }

  notesOrder = shuffle(notesOrder);

  for (let i = 0; i < 12; i++) {
    let xPosition = startingX - notesOrder[i] * musicSquareWidth * 0.5;
    let square = new MusicSquare(
      xPosition,
      i * noteHeight,
      musicSquareWidth,
      noteHeight,
      notes[i]
    );
    squares.push(square);
  }
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

function draw() {
  background(complementaryColor.r, complementaryColor.g, complementaryColor.b);

  for (let square of squares) {
    let newParticles = square.generateParticles();
    particleArray.push(...newParticles);

    let originalY = notes.indexOf(square.note) * (height / 12) + height / 24;
    square.y = originalY + 20 * sin(frameCount / 100 + square.x / 200);
    square.move();
  }

  for (let i = particleArray.length - 1; i >= 0; i--) {
    if (particleArray[i].alpha <= 0) {
      particleArray.splice(i, 1);
    } else {
      particleArray[i].update();
      particleArray[i].display();
    }
  }

  for (let square of squares) {
    square.display();
  }
}
