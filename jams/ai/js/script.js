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
/* flash here */
/* 5 */ 'Go here if check successful',
/* 6 */ 'Blah blah',
/* 7 */ 'Another check next',
/* flash here */
/* 8 */ 'Go here if check successful',
/* 9 */ 'Blaaaaa',
/* 10 */ 'Another check',
/* flash here */
/* 11 */ 'Check success',
/* 12 */ 'Blah blah',
/* 13 */ 'Check next',
/* flash here */
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
}

//advances text timeline
//check cases where the program would start the timer, disable display so no interruption
function checkTimeline() {
    switch(ti) {
        case 4: case 7: case 10: case 13:
            display = false;
            setTimer();
            break;
            case 15: case 17:
            location.reload(); //ending dialogue reset point
            break;
        default:
            ti++;
            break;
    }
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
//this happens during a small window frame of 0.1 second at the start of the camera flash
//the last result obtained is retained in bool success
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

//checks results retained in variable success being true or false in checkEmotion()
function checkResults() {
    if(success) {
        ti++; //advances dialogue like usual

        //if success, change emotion to what the next check will be for
        switch(ti) {
            case 5: emotion = 'frown';
                break;
            case 8: emotion = 'surprised';
                break;
            case 11: emotion = 'overjoyed';
                break;
        }
    }
    else ti = 16; //failure dialogue
    display = true; //reset dialogue to be displayed + user control
}

//p5js draw
function draw() {
    image(video, 0, 0, width, height);
    if(blind > 0) drawBlind();
    if(countdown > 0) drawCountdown();
    if(display) drawTranscript();
    if(predicting) findKeypoints();
    drawKeypoints();
}

//keypoints draw (temporary)
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

//'camera' flash effect draw
function drawBlind() {
    push();
    rectMode(CENTER);
    noStroke();
    fill(255, 255, 255, blind);
    rect(width/2, height/2, width, height);
    pop();
}

//countdown draw
function drawCountdown() {
    push();
    textAlign(CENTER, CENTER);
    textSize(54);
    fill(255);
    text(countdown, width/2, height/2);
    pop();
}

//draw the dialogue transcript from the timeline
function drawTranscript() {
    push();
    textAlign(CENTER, CENTER);
    textSize(24);
    fill(255);
    text(timeline[ti], width/2, height/2+100);
    pop();
}

//sets timer
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
        checkResults();
    }
}

//user advances dialogue in timeline with mouseclick
function mousePressed() {
    if(display) checkTimeline();
}