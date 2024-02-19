/**
ML.JS AI jam
Viviana Ema Radu

refs: https://learn.ml5js.org/#/reference/facemesh
https://github.com/tensorflow/tfjs-models/tree/master/face-landmarks-detection#keypoints 

*/

"use strict";
//reference image is in images folder


let facemesh;
let video;
let predictions = [];

let transcript = "";
let timer;
let flash;
let blind = 0;
let countdown = 0;

let keypoints = [];

let timeline = [];
let emotion = 'happy';
let success = false;
let display = true;

function setup() {
  createCanvas(640, 480);

  // facemesh setup, all taken from the example on ml5's facemesh reference 
  video = createCapture(VIDEO);
  video.size(width, height);

  facemesh = ml5.facemesh(video, startSequence);
  facemesh.on("predict", results => {
    predictions = results;
  });

  video.hide();
}

function startSequence() {

    console.log("Model ready!");

    transcript = timeline[0];
}

//check specific checkpoints
//top lip: 13
//bottom lip: 14
//left corner mouth: 
function setupKeypoints() {
    for (let i = 0; i < predictions.length; i += 1) {
      const keypoints = predictions[i].scaledMesh;
  
      // Draw facial keypoints.
      for (let j = 0; j < keypoints.length; j += 1) {
        const [x, y] = keypoints[j];
  
        fill(0, 255, 0);
        ellipse(x, y, 5, 5);
      }
    }
}

function checkEmotion() {
    print('this is where the check happens');
}

function draw() {
    image(video, 0, 0, width, height);
    if(blind > 0) drawBlind();
    if(countdown > 0) drawCountdown();
    if(display) drawTranscript();
}

function drawBlind() {
    push();
    rectMode(CENTER);
    noStroke();
    fill(255, 255, 255, blind);
    rect(width/2, height/2, width, height);
    pop();
}

function drawCountdown() {
    push();
    textAlign(CENTER, CENTER);
    textSize(54);
    fill(255);
    text(countdown, width/2, height/2);
    pop();
}

function drawTranscript() {
    
}

//setInterval for countdown
function timerInterval() {
    countdown--;

    if(countdown == 0) {
        startFlash();
        checkEmotion();
        clearInterval(timer);
    }
}

//sets the flash interval
function startFlash() {
    print("flash");
    blind = 255;
    flash = setInterval(flashInterval, 100);
}

//camera flash setInterval
function flashInterval() {
    blind -= 55;
    if(blind <= 0) {
        blind = 0;
        clearInterval(flash);
    }
}

function mousePressed() {
    countdown = 3;
    timer = setInterval(timerInterval, 800);
}