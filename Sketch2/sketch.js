let start3 = false;

let birdImg;
let fishImg;
let birdPosition;
let fishPosition;
let birdSize = 30;
let fishSize = 40;
let touching = false;
let showFish = true; // Flag to show or hide the fish
let rocks = []; // Array to hold the rock positions
let trees = []; // Array to hold the tree positions
let clouds = []; // Array to hold the cloud positions
let mySound;
let x = 1;
let y = 1;
let easing = 0.1;

var capture;
var tracker;
var w = 640,
  h = 480;


function preload() {
  mySound = loadSound("assets/B2.mp3");
  birdImg = loadImage('assets/Bird.gif'); // Make sure the image is in your project directory
  fishImg = loadImage("assets/Frogfish.png");
}

function setup() {
  birdImg.resize(200,100);
  createCanvas(1800, 800);
  birdPosition = createVector(width * 0.75, height * 0.25);
  fishPosition = createVector(width * 0.1, height * 0.85);
  noStroke(); // Disable stroke globally
  capture = createCapture(
    {
      audio: false,
      video: {
        width: w,
        height: h,
      },
    },
    function () {
      console.log("capture ready.");
    }
  );
  capture.elt.setAttribute("playsinline", "");
  //createCanvas(w, h);
  capture.size(1800, 800);
  capture.hide();

  tracker = new clm.tracker();
  //init = initialize
  tracker.init();
  // this starts the capture
  tracker.start(capture.elt);

  // Generate rocks with fixed positions, ensuring they don't overlay the trees or the ocean
  while (rocks.length < 20) {
    let rockX = random(0, width / 2);
    let rockY = random(height / 2, height);
    let rockSize = random(20, 50);
    let rock = {
      x: rockX,
      y: rockY,
      size: rockSize,
      color: color(random(100, 150), random(100, 150), random(100, 150))
    };
    // Check if rock overlaps any trees
    let overlappingTree = trees.some(tree => dist(rockX, rockY, tree.x, tree.y) < tree.size + rockSize);
    let overlappingOcean = rockX > width / 2;
    if (!overlappingTree && !overlappingOcean) {
      rocks.push(rock);
    }
  }

  // Generate tree positions
  for (let i = 0; i < 10; i++) {
    trees.push({
      x: random(0, width / 4),
      y: random(height / 2, height - 100),
      size: 80 // Assuming an average width of 80 for the tree for collision detection
    });
  }

  // Generate cloud positions
  for (let i = 0; i < 10; i++) {
    let cloudX = random(0, width);
    let cloudY = random(0, height / 2);
    clouds.push({ x: cloudX, y: cloudY });
  }
}

function draw() {
  background(135, 206, 235);
  drawIsland();
  drawClouds();
  drawDesertAndOcean();
  drawRocks();
  drawTrees();
  drawBird();
  
  // Draw the fish only if it's supposed to be shown
  if (showFish) {
    drawFish();
  }

  if (touching && showFish) {
    showFish = false; // Set showFish to false to hide the fish
    start3 = true; // Set start3 to true when the fish touches the bird
    storeItem('start2', start3); // Store the value of start3
  }

  touching = dist(birdPosition.x, birdPosition.y, fishPosition.x, fishPosition.y) < (birdSize / 2 + fishSize / 2);
}


function drawIsland() {
  fill(124, 252, 0);
  ellipse(160, 500, 300, 100);
  drawTree(150, 500);
}

function drawClouds() {
  fill(255);
  clouds.forEach(cloud => {
    drawCloud(cloud.x, cloud.y);
  });
}

function drawCloud(x, y) {
  ellipse(x, y, 60, 40);
  ellipse(x + 30, y + 10, 80, 60);
  ellipse(x - 30, y + 10, 80, 50);
  ellipse(x, y - 10, 100, 50);
}

function drawDesertAndOcean() {
  let midpoint = width / 2;
  fill(244, 164, 96); // Desert
  rect(0, height / 2, midpoint, height / 2);
  fill(0, 105, 148); // Ocean
  rect(midpoint, height / 2, width - midpoint, height / 2);
}

function drawRocks() {
  rocks.forEach(rock => {
    fill(rock.color);
    ellipse(rock.x, rock.y, rock.size);
  });
}

function drawTrees() {
  trees.forEach(tree => {
    drawTree(tree.x, tree.y);
  });
}

function drawTree(x, y) {
  fill(139, 69, 19); // Trunk
  rect(x - 10, y - 70, 20, 70);
  fill(34, 139, 34); // Leaves
  ellipse(x, y - 100, 80, 80);
  ellipse(x - 30, y - 80, 80, 80);
  ellipse(x + 30, y - 80, 80, 80);
  ellipse(x, y - 120, 100, 100);
}

function drawFish() {
  // Move the fish randomly within the ocean area
  let dx = random(-2, 2); // Adjust the speed (-2 to 2) for fish movement
  let dy = random(-2, 2);
  fishPosition.x += dx;
  fishPosition.y += dy;

  // Wrap the fish around if it goes out of bounds
  if (fishPosition.x < width / 2) {
    fishPosition.x = random(width / 2, width);
  } else if (fishPosition.x > width) {
    fishPosition.x = random(width / 2, width);
  }

  if (fishPosition.y < height / 2) {
    fishPosition.y = random(height / 2, height);
  } else if (fishPosition.y > height) {
    fishPosition.y = random(height / 2, height);
  }

  // Draw the fish image with larger size
  image(fishImg, fishPosition.x, fishPosition.y, fishSize * 3, fishSize * 1.5);
}

function drawBird(){
  push();
  translate(width,0);
  scale(-1,1);
  //image(capture, 0, 0, w, h);
  var positions = tracker.getCurrentPosition();
  if (positions.length > 0) {
    let targetX = positions[62][0];
    let dx = targetX - x;
    x += dx * easing;

    let targetY = positions[62][1];
    let dy = targetY - y;
    y += dy * easing;
    fill(0);
    noStroke();
    push();
    translate(x,y);
    rotate(PI/2);
    image(birdImg,0,0);
    pop();
  }
   pop();
}

function mouseIsPressed() {
  if (mySound.isPlaying()) {
    mySound.stop(); // Stop the sound if it's playing
  } else {
    mySound.play(); // Play the sound if it's not playing
  }
}
