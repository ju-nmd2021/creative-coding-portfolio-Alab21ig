// Portfolio 2

function setup() {
  createCanvas(innerWidth, innerHeight);
}

function setup() {
  createCanvas(innerWidth, innerHeight);

  colour = {
    r: Math.floor(Math.random() * 85) + 170,
    g: Math.floor(Math.random() * 85) + 170,
    b: Math.floor(Math.random() * 85) + 170,
  };
  len = Math.floor(Math.random() * 40) + 20;
  angle = radians(Math.floor(Math.random() * 22) + 15);
  for (let i = 0; i < 2; i++) {
    generate();
  }
}

let axiom = [
  { char: "F", len: randomLength() },
  { char: "X", len: null },
];
let sentence = axiom;

let len = Math.floor(Math.random() * 40) + 20;
let angle;
let colour = {
  r: Math.floor(Math.random() * 85) + 170,
  g: Math.floor(Math.random() * 85) + 170,
  b: Math.floor(Math.random() * 85) + 170,
};

let rules = [];
rules[0] = {
  a: "F",
  b: "FF-[-F+F+F]+[+F-F-F]",
};

function generate() {
  let nextSentence = [];
  for (let i = 0; i < sentence.length; i++) {
    let current = sentence[i].char;
    let found = false;
    for (let j = 0; j < rules.length; j++) {
      if (current == rules[j].a) {
        for (let char of rules[j].b) {
          if (char === "F") {
            nextSentence.push({ char: char, len: randomLength() });
          } else {
            nextSentence.push({ char: char, len: null });
          }
        }
        found = true;
        break;
      }
    }
    if (!found) {
      nextSentence.push(sentence[i]);
    }
  }
  sentence = nextSentence;
  turtle();
}

function turtle() {
  background(colour.r - 170, colour.g - 170, colour.b - 170);

  resetMatrix();
  translate(innerWidth / 2, innerHeight);

  for (let i = 0; i < sentence.length; i++) {
    let current = sentence[i].char;
    if (current == "F") {
      let currentStrokeWeight = map(sentence[i].len, 20, 60, 3, 17);
      let shadeEffect = map(currentStrokeWeight, 3, 10, 1, 70);
      let darkenedR = constrain(colour.r - shadeEffect, 0, 255);
      let darkenedG = constrain(colour.g - shadeEffect, 0, 255);
      let darkenedB = constrain(colour.b - shadeEffect, 0, 255);

      strokeWeight(currentStrokeWeight);
      stroke(darkenedR, darkenedG, darkenedB);
      line(0, 0, 0, -sentence[i].len * 1.3);
      translate(0, -sentence[i].len * 1.3);
    } else if (current == "X") {
      translate(0, -len);
    } else if (current == "+") {
      rotate(angle);
    } else if (current == "-") {
      rotate(-angle);
    } else if (current == "[") {
      push();
    } else if (current == "]") {
      pop();
    }
  }
}

function randomLength() {
  return Math.floor(Math.random() * 40) + 20;
}

function draw() {
  turtle();
}
