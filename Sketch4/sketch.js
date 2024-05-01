let posX, posY; // Position of the creature
let gravity = 0.5; // Gravity pulling the creature down
let lift = -15; // Lift force when the mouse is clicked
let velocity = 0; // Current vertical velocity of the creature
let bodyColor;
let noiseOffset;
let pupilOffsetX, pupilOffsetY;

let stars = []; // Array to manage falling stars
let numStars = 100; // Number of stars for the background animation

function setup() {
    createCanvas(windowWidth, windowHeight); // Set the canvas size based on the window's dimensions
    posX = width / 2;
    posY = height - 30; // Start near the bottom of the canvas
    bodyColor = color(255); // Initial body color
    noiseOffset = random(1000); // Noise offset for unique creature shapes
    pupilOffsetX = 0;
    pupilOffsetY = 0;

    // Initialize falling stars
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: random(width),
            y: random(height),
            speed: random(1, 5)
        });
    }
}

function draw() {
    background(0); // Black background

    // Draw and update falling stars
    drawAndMoveStars();

    // Update creature's vertical position
    velocity += gravity; // Gravity affects the velocity
    posY += velocity; // Update position based on velocity

    // Check if the creature is below the bottom of the canvas and stop it
    if (posY > height) {
        posY = height; // Keep the creature at the bottom
        velocity = 0;
    }

    // Check if the creature is above the screen and wrap it to the bottom
    if (posY < -50) {
        posY = height;
    }

    drawCreature();
}

function drawCreature() {
    push();
    translate(posX, posY);

    // Wings
    let wingAngle = sin(frameCount * 0.1) * PI / 6;
    drawWing(-30, -10, wingAngle);
    drawWing(30, -10, -wingAngle);

    // Body
    fill(bodyColor);
    noStroke();
    beginShape();
    const numVertices = 100;
    for (let j = 0; j < numVertices; j++) {
        let angle = map(j, 0, numVertices, 0, TWO_PI);
        let radius = map(noise(cos(angle) * 0.5 + noiseOffset, sin(angle) * 0.5 + noiseOffset), 0, 1, 25, 50);
        vertex(radius * cos(angle), radius * sin(angle));
    }
    endShape(CLOSE);

    // Eye
    fill(255);
    ellipse(0, -10, 20, 30);
    fill(0);
    ellipse(pupilOffsetX, pupilOffsetY - 10, 10, 10);
    
    pop();
}

function drawWing(xOffset, yOffset, flapAngle) {
    push();
    noStroke();
    translate(xOffset, yOffset);
    rotate(flapAngle);
    fill(bodyColor);
    ellipse(0, 0, 90, 20);
    pop();
}

function mousePressed() {
    // Apply an upward force when the mouse is clicked
    velocity += lift;
}

function drawAndMoveStars() {
    stroke(255);
    strokeWeight(3);
    stars.forEach(star => {
        point(star.x, star.y);
        star.y += star.speed;

        // Reset star to the top of the screen if it moves past the bottom
        if (star.y > height) {
            star.y = 0;
            star.x = random(width);
            star.speed = random(1, 5);
        }
    });
}
