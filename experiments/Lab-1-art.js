function setup() {
  createCanvas(innerWidth, innerHeight);
}

// var offSet = 0;
// var scale = 1;
// var position = { x: 150, y: 500 };
// var x = position.x;
// var y = position.y;

// function tree(x, y, scale) {
//   push();

//   fill(38, 63, 68);
//   translate(position.x, position.y);
//   noStroke();

//   rect(-20 * scale, 0, 40 * scale, -75 * scale);
//   triangle(
//     -100 * scale,
//     -75 * scale,
//     +100 * scale,
//     -75 * scale,
//     0,
//     -200 * scale
//   );
//   triangle(
//     -70 * scale,
//     -150 * scale,
//     +70 * scale,
//     -150 * scale,
//     0,
//     -240 * scale
//   );

//   triangle(
//     -40 * scale,
//     -210 * scale,
//     +40 * scale,
//     -210 * scale,
//     0,
//     -270 * scale
//   );

//   pop();
// }

// function draw(x, y, colour) {
//   tree(x, y, scale);
// }

// Portfolio 1 MAKE it Bezeir corve!

let axiom = "FX";
let sentence = axiom;
let len = Math.floor(Math.random() * 40) + 20;
let angle = radians(Math.floor(Math.random() * 22) + 15);
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
  let nextSentence = "";
  for (let i = 0; i < sentence.length; i++) {
    let current = sentence.charAt(i);
    let found = false;
    for (let j = 0; j < rules.length; j++) {
      if (current == rules[j].a) {
        nextSentence += rules[j].b;
        found = true;
        break;
      }
      if (!found) {
        nextSentence += current;
      }
    }
  }
  sentence = nextSentence;
  turtle();
}

function turtle() {
  background(colour.r - 170, colour.g - 170, colour.b - 170);
  strokeWeight(5);
  stroke(colour.r, colour.g, colour.b);
  resetMatrix();
  translate(windowWidth / 2, windowHeight);
  for (let i = 0; i < sentence.length; i++) {
    let current = sentence.charAt(i);
    if (current == "F") {
      line(0, 0, 0, -len);
      translate(0, -len);
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

function setup() {
  createCanvas(windowWidth, windowHeight);
  // background(51, 47, 60);
  // turtle();
}

function draw() {
  turtle();
}

for (let i = 0; i < 2; i++) {
  generate();
}
