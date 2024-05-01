let birdImg;
let eyeSize = 35; // Initial size of the eye
let eyeZoomLevel = 1;
let deltaZoom = 0.01; // How quickly the eye zooms in and out
let maxEyeZoom = 5;
let minEyeZoom = 1;
let eyeX, eyeY; // Position of the eye
let mySound;
let start3;

function preload() {
  birdImg = loadImage('Bird1.jpg'); // Make sure the image is in your project directory
  mySound = loadSound("assets/B3.mp3");
}

function setup() {
  start3 = getItem('start2'); // Retrieve the stored value of start2
  createCanvas(birdImg.width, birdImg.height);
  eyeX = width / 2 + 47; // Adjust these values to match the eye's position
  eyeY = height / 2 - 112;
  frameRate(30); // Control the frame rate for smoother animation
}

function draw() {
  clear();
  imageMode(CENTER);
  image(birdImg, width / 2, height / 2);

  // Update the eye zoom level only if start3 is true
  if (start3) {
    eyeZoomLevel += deltaZoom;
    if (eyeZoomLevel > maxEyeZoom || eyeZoomLevel < minEyeZoom) {
      deltaZoom *= -1; // Reverse the direction of the zoom
    }
  }

  // Draw the zoomable eye over the bird's eye
  drawEye();
}

function drawEye() {
  // Use eyeZoomLevel to scale the size of the eye
  let scaledEyeSize = eyeSize * eyeZoomLevel;

  // Drawing the zoomable eye
  fill(255); // White part of the eye
  ellipse(eyeX, eyeY, scaledEyeSize, scaledEyeSize);
  fill(0); // Pupil
  ellipse(eyeX, eyeY, scaledEyeSize / 2, scaledEyeSize / 2);
}

function mousePressed() {
  if (mySound.isPlaying()) {
    mySound.stop(); // Stop the sound if it's playing
  } else {
    mySound.play(); // Play the sound if it's not playing
  }
}
