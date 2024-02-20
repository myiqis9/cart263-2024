/**
ML.JS AI jam
Viviana Ema Radu

refs: https://learn.ml5js.org/#/reference/facemesh
https://github.com/tensorflow/tfjs-models/tree/master/face-landmarks-detection#keypoints
reference image for keypoints is in images folder

*/
"use strict";

let facemesh;
let video;
let predictions = [];

let transcript = "";
let timer;
let flash;
let blind = 0;
let countdown = 0;

//array of all keypoints
let keypoints = [];

let emotion = 'happy';
let predicting = false;
let success = false;
let display = true;

let timeline = [
/* 0 */ 'Welcome! Click anywhere to start.',
/* 1 */ 'Texttttt',
/* 2 */ 'Text 3',
/* 3 */ 'Text 4',
/* 4 */ 'Check happens next',
/* 5 */ 'Go here if check successful',
/* 6 */ 'Blah blah',
/* 7 */ 'Another check next',
/* 8 */ 'Go here if check successful',
/* 9 */ 'Blaaaaa',
/* 10 */ 'Another check',
/* 11 */ 'Check success',
/* 12 */ 'Blah blah',
/* 13 */ 'Check next',
/* 14 */ 'Check success',
/* 15 */ 'You passed every check!!!',
/* 16 */ 'This is the check failure',
/* 17 */ 'Would you like to retry?'
];

let ti = 0; //timeline index, to check what point of the timeline to go to depending on results

function setup() {
  createCanvas(640, 480);

  // facemesh setup, all taken from the example on ml5's facemesh reference 
  video = createCapture(VIDEO);
  video.size(width, height);

  facemesh = ml5.facemesh(video, startSequence);
  facemesh.on('face', results => {
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
//left corner mouth: 61
//right corner mouth: 291
function findKeypoints() {
    if(predictions.length > 0) {
        let face = predictions[0].scaledMesh;

        let top = new Keypoint('top', face[13][0], face[13][1]);
        let bottom = new Keypoint('bottom', face[14][0], face[14][1]);
        let left = new Keypoint('left', face[61][0], face[61][1]);
        let right = new Keypoint('right', face[291][0], face[291][1]);

        keypoints = [top, bottom, left, right];
        checkEmotion();
    }
}

//keypoints array order: 
// 0 top
// 1 bottom
// 2 left
// 3 right
function checkEmotion() {
    switch(emotion) {
        case 'happy':
            success = keypoints[0].checkHappy(keypoints[2], keypoints[3]) ? true : false;
            break;
        case 'frown':
            success = keypoints[0].checkFrown(keypoints[2], keypoints[3]) ? true : false;
            break;
        case 'surprised':
            success = keypoints[0].checkSurprised(keypoints[1]) ? true : false;
            break;
        case 'overjoyed':
            success = keypoints[0].checkOverjoyed(keypoints[1], keypoints[2], keypoints[3]) ? true : false;
            break;
    }
}

function draw() {
    image(video, 0, 0, width, height);
    if(blind > 0) drawBlind();
    if(countdown > 0) drawCountdown();
    if(display) drawTranscript();
    if(predicting) findKeypoints();
    drawKeypoints();
}

function drawKeypoints() {
    let index = 0;
    for(let key of keypoints) {
        fill(255);
        textSize(10);
        textAlign(CENTER, CENTER);
        text(index, key.x, key.y);
        index++;
    }
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

function setTimer() {
    countdown = 3;
    timer = setInterval(timerInterval, 800);
}

//setInterval for countdown
function timerInterval() {
    countdown--;

    if(countdown == 0) {
        startFlash();
        clearInterval(timer);
    }
}

//sets the flash interval
function startFlash() {
    print("flash");
    blind = 255;
    flash = setInterval(flashInterval, 100);
    predicting = true; //begins predicting and reading your face
}

//camera flash setInterval
function flashInterval() {
    blind -= 55;

    //set very short interval mid-flash in which it predicts the face
    if(blind < 201) predicting = false;

    if(blind <= 0) {
        blind = 0;
        clearInterval(flash);
    }
}

function mousePressed() {
    setTimer();
}