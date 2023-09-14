// Portfolio 2

function setup() {
  createCanvas(800, 750);
  background(255, 255, 255);
  field = generateField();
  generateAgents();

  element = new Element(100, 100);
  attractor = new Attractor(innerWidth / 2, innerHeight / 2);
}

class Boid {
  constructor(x, y, maxSpeed, maxForce) {
    this.position = createVector(x, y);
    this.lastPosition = createVector(x, y);
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
    this.lastPosition = this.position.copy();

    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  checkBorders() {
    if (this.position.x < 0) {
      this.position.x = innerWidth;
      this.lastPosition.x = innerWidth;
    } else if (this.position.x > innerWidth) {
      this.position.x = 0;
      this.lastPosition.x = 0;
    }
    if (this.position.y < 0) {
      this.position.y = innerHeight;
      this.lastPosition.y = innerHeight;
    } else if (this.position.y > innerHeight) {
      this.position.y = 0;
      this.lastPosition.y = 0;
    }
  }

  draw() {
    push();
    stroke(0, 0, 0, 40);
    strokeWeight(1);
    line(
      this.lastPosition.x,
      this.lastPosition.y,
      this.position.x,
      this.position.y
    );
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
      Math.random() * 6 + 10,
      0.1
    );
    agents.push(agent);
  }
}

const fieldSize = 50;
const fieldSizeHalf = fieldSize / 2;
const maxCols = Math.ceil(innerWidth / fieldSize);
const maxRows = Math.ceil(innerHeight / fieldSize);
let field;
let agents = [];

class Element {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 4);
    this.acceleration = createVector(0, 0);
    this.size = 80;

    this.noiseOffset = random(0, 1000);
    this.mass = map(noise(this.noiseOffset), 0, 1, 3, 10);
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

  draw() {
    push();
    fill(0, 0, 0);
    ellipse(this.position.x, this.position.y, this.size);
    pop();
  }
}

let element;
let attractor;
let G = 1;

function draw() {
  // background(255, 255, 255);
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

  let force = attractor.attract(element);
  element.applyForce(force);
  element.update();

  // element.draw();S
  // attractor.draw();
}
