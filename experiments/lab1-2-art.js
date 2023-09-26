// Lab 4

//With the help of Mekong L-System code formula, and some help of chatgpt and my changes in the code this code is made.
//Thw link for Chatgpt code page to make each F has a seperate fixed length value
//https://chat.openai.com/share/7d4c3301-b95c-43e9-b166-ff45a79c2ec2

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
  turtle();
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
  background(255 - colour.r, 255 - colour.g, 255 - colour.b);
  resetMatrix();
  translate(innerWidth / 2, innerHeight);
  noFill();
  for (let i = 0; i < sentence.length; i++) {
    let current = sentence[i].char;
    if (current == "F") {
      let currentStrokeWeight = map(sentence[i].len, 20, 60, 3, 10);
      let shadeFactor = map(currentStrokeWeight, 3, 10, 1, 70);
      let darkenedR = constrain(colour.r - shadeFactor, 0, 255);
      let darkenedG = constrain(colour.g - shadeFactor, 0, 255);
      let darkenedB = constrain(colour.b - shadeFactor, 0, 255);

      strokeWeight(currentStrokeWeight);
      stroke(darkenedR, darkenedG, darkenedB);

      if (random() > 0.5) {
        line(0, 0, 0, -sentence[i].len * 1.3);
      } else {
        let cp1x = random(-20, 20);
        let cp1y = random(-sentence[i].len / 2, 0);
        let cp2x = random(-20, 20);
        let cp2y = random(-sentence[i].len, -sentence[i].len / 2);
        bezier(0, 0, cp1x, cp1y, cp2x, cp2y, 0, -sentence[i].len * 1.3);
      }

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
