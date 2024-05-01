let sands = [];
let rocks = [];
let mySound;
let pondSound;  
let darkSky = false;
let fireworks = [];

function preload() {
    mySound = loadSound("assets/B1.mp3");
    pondSound = loadSound("assets/BG1.mp3");  // Load the pond sound
}

function setup() {
  createCanvas(1800, 800);
  for (let i = 0; i < 200; i++) {
    sands.push({x: random(width), y: random(height / 2), size: random(6, 8)});
  }
  initializeRocks();
}

function draw() {
  if (darkSky) {
    background(18, 18, 30); // Dark sky for night mode
  } else {
    background(135, 206, 235); // Regular sky
  }
  fill(210, 180, 140);
  rect(0, height / 2, width, height / 2);
  drawPond(width / 2, height * 0.75, 600, 300);
  drawTrees();
  drawRocks();
  drawSand();
  drawText();
  drawFireworks();
}

function drawFireworks() {
  for (let i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].display();
    if (fireworks[i].done()) {
      fireworks.splice(i, 1);
    }
  }
}

function drawSand() {
  fill(194, 178, 128, 150);
  sands.forEach(sand => {
    ellipse(sand.x, sand.y, sand.size);
    sand.y += random(-0.5, 0.5);
    sand.x += 3;
    if (sand.x > width) sand.x = 0;
  });
}

function drawPond(x, y, w, h) {
  beginShape();
  for (let i = 0; i < 360; i += 5) {
    let angle = radians(i);
    let radiusX = w / 2 + noise(frameCount * 0.01 + i) * 30;
    let radiusY = h / 2 + noise(frameCount * 0.01 + i) * 30;
    let posX = x + radiusX * cos(angle);
    let posY = y + radiusY * sin(angle);
    vertex(posX, posY);
  }
  fill(0, 191, 255);
  endShape(CLOSE);
}

function drawTrees() {
  const positions = [
    {x: 40, y: height / 2 + 100}, {x: 400, y: height / 2 + 200},
    {x: 650, y: height / 2 + 250}, {x: 600, y: height / 2 - 50},
    {x: 150, y: height / 2 + 120}, {x: 600, y: height / 2 - 50},
    {x: 200, y: height / 2 + 80}, {x: 600, y: height / 2 - 50},
    {x: 350, y: height / 2 + 100}, {x: 600, y: height / 2 - 50},
    {x: 500, y: height / 2 + 220}, {x: 1400, y: height / 2 + 160},
    {x: 1650, y: height / 2 + 180}, {x: 1300, y: height / 2 - 70},
    {x: 1500, y: height / 2 + 210}, {x: 1300, y: height / 2 + 190}
  ];
  positions.forEach(pos => drawTree(pos.x, pos.y));
}

function drawTree(x, y) {
  fill(139, 69, 19);
  rect(x - 10, y + 30, 20, 100);
  fill(34, 139, 34);
  for (let i = 0; i < 5; i++) {
    triangle(
      x - 50 + i * 10, y + 30 - i * 20,
      x + 50 - i * 10, y + 30 - i * 20,
      x, y - i * 20
    );
  }
}

function initializeRocks() {
  const rockPositions = [
    {x: 100, y: height * 0.65}, {x: 440, y: height * 0.85},
    {x: 530, y: height * 0.60}, {x: 1630, y: height * 0.63},
    {x: 1270, y: height * 0.85}, {x: 1405, y: height * 0.60},
    {x: 420, y: height * 0.55}, {x: 1320, y: height * 0.95},
    {x: 1580, y: height * 0.60}, {x: 200, y: height * 0.95},
    {x: 1420, y: height * 0.52}, {x: 60, y: height * 0.95},
    {x: 1600, y: height * 0.80}, {x: 1700, y: height * 0.98}
  ];
  rockPositions.forEach(rock => {
    let components = [];
    const numEllipses = floor(random(2, 5));
    for (let i = 0; i < numEllipses; i++) {
      components.push({
        offsetX: random(-10, 10),
        offsetY: random(-10, 10),
        width: random(20, 30),
        height: random(15, 25)
      });
    }
    rocks.push({x: rock.x, y: rock.y, components});
  });
}

function drawRocks() {
  noStroke();
  rocks.forEach(rock => {
    rock.components.forEach(comp => {
      fill("grey");
      ellipse(rock.x + comp.offsetX, rock.y + comp.offsetY, comp.width, comp.height);
    });
  });
}

function drawText() {
  fill(255, 239, 213);
  rect(width / 2 - 250, height / 4 - 30, 500, 60);  // Scaled text box
  fill(0);
  textSize(24);  // Scaled text size
  textAlign(CENTER, CENTER);
  text("Let's Flashback to Africa 2024", width / 2, height / 4);
}

function mousePressed() {
  if (mouseX >= width / 2 - 250 && mouseX <= width / 2 + 250 &&
      mouseY >= height / 4 - 30 && mouseY <= height / 4 + 30) {
    darkSky = !darkSky;
    if (!darkSky) {  // Only trigger fireworks when switching to dark sky
      for (let i = 0; i < 5; i++) {  // Launch multiple fireworks
        fireworks.push(new Firework());
      }
    }
  }
  if (mySound.isPlaying()) {
    mySound.stop();
  } else {
    mySound.play();
  }
}

function mousePressed() {
    // Check if the mouse click is within the pond area
    if (dist(mouseX, mouseY, width / 2, height * 0.75) < 300) {  // Assuming the pond radius is 300 for simplicity
        if (!pondSound.isPlaying()) {
            pondSound.play();  // Play the pond sound if it's not already playing
        }
    }
    
    // Toggle playing the background music
    if (mouseX >= width / 2 - 250 && mouseX <= width / 2 + 250 &&
        mouseY >= height / 4 - 30 && mouseY <= height / 4 + 30) {
        darkSky = !darkSky;  // Toggle dark sky
        if (!darkSky) {  // Trigger fireworks when switching to dark sky
            for (let i = 0; i < 5; i++) {
                fireworks.push(new Firework());
            }
        }
    }
    
    if (mySound.isPlaying()) {
        mySound.stop();
    } else {
        mySound.play();
    }
}

function Firework() {
    this.pos = createVector(random(width), height);
    this.vel = createVector(0, random(-12, -8));
    this.acc = createVector(0, 0);
    this.exploded = false;
    this.particles = [];

    this.update = function() {
        if (!this.exploded) {
            this.vel.add(this.acc);
            this.pos.add(this.vel);
            this.acc.mult(0);
            if (this.vel.y >= 0) {
                this.exploded = true;
                this.explode();
            }
        }
        for (let i = this.particles.length - 1; i >= 0; i--) {
            this.particles[i].update();
            if (this.particles[i].done()) {
                this.particles.splice(i, 1);
            }
        }
    };

    this.explode = function() {
        for (let i = 0; i < 100; i++) {
            let p = new Particle(this.pos.x, this.pos.y);
            this.particles.push(p);
        }
    };

    this.display = function() {
        if (!this.exploded) {
            fill(255);
            ellipse(this.pos.x, this.pos.y, 4);
        }
        for (let p of this.particles) {
            p.display();
        }
    };

    this.done = function() {
        return this.exploded && this.particles.length === 0;
    };
}

function Particle(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(2, 10));
    this.acc = createVector(0.3, 0.5);
    this.lifespan = 255;

    this.update = function() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.lifespan -= 10;
    };

    this.display = function() {
        stroke(255, this.lifespan);
        strokeWeight(10);
        fill(255, this.lifespan);
        ellipse(this.pos.x, this.pos.y, 4);
    };

    this.done = function() {
        return this.lifespan <= 0;
    };
}
