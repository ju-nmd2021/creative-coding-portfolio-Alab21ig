// Portfolio 2

function setup() {
  createCanvas(innerWidth, innerHeight);
  field = generateField();
  generateAgents();

  element = new Element(100, 100);
  attractor = new Attractor(400, 350);
}

class Boid {
  constructor(x, y, maxSpeed, maxForce) {
    this.position = createVector(x, y);
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, 0);
    this.maxSpeed = maxSpeed;
    this.maxForce = maxForce;
  }

  follow(desiredDirection) {
    desiredDirection = desiredDirection.copy();
    desiredDirection.mult(this.maxSpeed);
    let steer = p5.Vector.sub(desiredDirection, this.velocity);
    steer.limit(this.maxForce);
    this.applyForce(steer);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  checkBorders() {
    if (this.position.x < 0) {
      this.position.x = innerWidth;
    } else if (this.position.x > innerWidth) {
      this.position.x = 0;
    }
    if (this.position.y < 0) {
      this.position.y = innerHeight;
    } else if (this.position.y > innerHeight) {
      this.position.y = 0;
    }
  }

  draw() {
    push();
    translate(this.position.x, this.position.y);
    ellipse(0, 0, 10);
    pop();
  }
}

function generateField() {
  let field = [];
  for (let x = 0; x < maxCols; x++) {
    field.push([]);
    for (let y = 0; y < maxRows; y++) {
      let value;
      field[x].push(p5.Vector.fromAngle(value));
    }
  }
  return field;
}

function generateAgents() {
  for (let i = 0; i < 200; i++) {
    let agent = new Boid(
      Math.random() * innerWidth,
      Math.random() * innerHeight,
      4,
      0.1
    );
    agents.push(agent);
  }
}

const fieldSize = 50;
const fieldSizeHalf = fieldSize / 2;
const maxCols = Math.ceil(innerWidth / fieldSize);
const maxRows = Math.ceil(innerHeight / fieldSize);
const divider = 10;
let field;
let agents = [];

class Element {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 4);
    this.acceleration = createVector(0, 0);
    this.size = 80;
    this.mass = 2;
  }

  applyForce(force) {
    let newForce = force.copy();
    newForce.div(this.mass);
    this.acceleration.add(newForce);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);

    this.acceleration.mult(0);
  }

  draw() {
    push();
    fill(0, 0, 0);
    ellipse(this.position.x, this.position.y, this.size);
    pop();
  }
}

class Attractor {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.size = 20;
    this.mass = 80;
  }

  attract(element) {
    let force = p5.Vector.sub(this.position, element.position);
    let distance = constrain(force.mag(), 5, 25);
    force.normalize();
    let m = (G * element.mass * this.mass) / (distance * distance);
    force.mult(m);
    return force;
  }

  // draw() {
  //   push();
  //   fill(0, 0, 0);
  //   ellipse(this.position.x, this.position.y, this.size);
  //   pop();
  // }
}

let element;
let attractor;
let G = 1;

function draw() {
  background(255, 255, 255);
  for (let x = 0; x < maxCols; x++) {
    for (let y = 0; y < maxRows; y++) {
      const padding = 10;
      const value = field[x][y];

      //Arrows points towards the element, learned from chatgpt
      //https://chat.openai.com/share/3a385122-66fc-4d18-917c-d716b64b7937
      const position = createVector(
        x * fieldSize + fieldSizeHalf,
        y * fieldSize + fieldSizeHalf
      );
      const dirToElement = p5.Vector.sub(element.position, position);
      dirToElement.normalize();
      field[x][y] = dirToElement;
      //

      push();
      translate(x * fieldSize + fieldSizeHalf, y * fieldSize + fieldSizeHalf);
      rotate(value.heading());
      strokeWeight(6);
      stroke(200, 200, 200);
      // Drawing an arrow
      fill(200, 200, 200);
      line(-fieldSizeHalf + padding, 0, fieldSizeHalf - padding, 0);
      triangle(
        fieldSizeHalf - padding,
        0,
        fieldSizeHalf - padding * 2,
        padding,
        fieldSizeHalf - padding * 2,
        -padding
      );
      pop();
    }
  }

  for (let agent of agents) {
    const x = Math.floor(agent.position.x / fieldSize);
    const y = Math.floor(agent.position.y / fieldSize);
    const desiredDirection = field[x][y];
    agent.follow(desiredDirection);
    agent.update();
    agent.checkBorders();
    agent.draw();
  }

  //Part 2 of portfolio 2

  let force = attractor.attract(element);
  element.applyForce(force);
  element.update();
  element.draw();

  // attractor.draw();
}
