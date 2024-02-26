/**
ML.JS AI jam
Viviana Ema Radu

refs: https://learn.ml5js.org/#/reference/facemesh
https://github.com/tensorflow/tfjs-models/tree/master/face-landmarks-detection#keypoints
reference image for keypoints is in images folder

*/
"use strict";

let state = 'loading'; //state of loading facemesh

let facemesh;
let video;
let predictions = []; //facemesh predictions array

let timer; //timer for camera
let flash; //camera flash
let blind = 0; //flash duration
let countdown = 0; //countdown displayed

//array of all keypoints
let keypoints = [];
//array of randomized keypoints for animation
let randomized = [];

let emotion = 'happy'; //emotion it checks for
let predicting = false; //is the emotion prediction happening?
let success = false; //has user displayed correct emotion?
let display = false; //is dialogue displaying/is user able to interact?

//timeline of dialogue
let timeline = [
/* 0 */ "Welcome! Click anywhere to start.",
/* 1 */ "This is a test designed to verify that you are human.",
/* 2 */ "Please provide a facial expression that would match with the prompt of each test.",
/* 3 */ "Make sure to face the camera head-on and to lean slightly downwards for the best results.",
/* 4 */ "First prompt: smile for the camera! Are you ready?",
/* flash here */
/* 5 */ "Great! You have passed the first test.",
/* 6 */ "And what a beautiful smile you have!",
/* 7 */ "Second prompt: you've had a terrible day! How sad! Are you ready?",
/* flash here */
/* 8 */ "Yay! You passed the second test!",
/* 9 */ "You may wipe that frown from your face! Happier times are ahead.",
/* 10 */ "Third prompt: you just heard some shocking news! Are you ready?",
/* flash here */
/* 11 */ "Third test was a success!",
/* 12 */ "The next one will be even more surprising! Prepare yourself.",
/* 13 */ "Final prompt: you have just won a million dollar lottery! Are you ready?",
/* flash here */
/* 14 */ "Congratulations! You successfully passed every check!!!",
/* 15 */ "We have confirmed you are human. You may celebrate your epic human status, or click anywhere to take the test again!",
/* failure */
/* 16 */ "Sorry, our data results concluded you are not human! You may not proceed.",
/* 17 */ "Would you like to retry? Click anywhere to restart."
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
    state = 'predicting';
    display = true;
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
//left cheek: 192
//right cheek: 416
function findKeypoints() {
    if(predictions.length > 0) {
        let face = predictions[0].scaledMesh;

        let top = new Keypoint(face[13][0], face[13][1]);
        let bottom = new Keypoint(face[14][0], face[14][1]);
        let mleft = new Keypoint(face[57][0], face[57][1]);
        let mright = new Keypoint(face[287][0], face[287][1]);
        let cleft = new Keypoint(face[192][0], face[192][1]);
        let cright = new Keypoint(face[416][0], face[416][1]);

        //make keypoints array update to these keypoints
        keypoints = [top, bottom, mleft, mright, cleft, cright];
        checkEmotion();
    }
}

//keypoints array order: 
// 0 mouth top
// 1 mouth bottom
// 2 mouth left
// 3 mouth right
// 4 cheek left
// 5 cheek right
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
            success = keypoints[0].checkOverjoyed(keypoints[1], keypoints[2], keypoints[3], keypoints[4], keypoints[5]) ? true : false;
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
    if(state == 'loading') load();
    else if (state == 'predicting') predict();
}

//p5js draw if facemesh is still loading
function load() {
    background(0);

    push();
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(24);
    fill(255);
    text('Loading Facemesh...', width/2, height/2);
    pop();
}

//p5js draw if facemesh loaded
function predict() {
    image(video, 0, 0, width, height);
    if(blind > 0) drawBlind();
    if(countdown > 0) drawCountdown();
    if(display) drawTranscript();
    else drawKeypoints();
    if(predicting) findKeypoints();
}

//randomizer for drawKeypoints() below (called every flash frame)
function randomize() {
    if(predictions.length > 0) {
        print('randomizing');
        let face = predictions[0].scaledMesh;

        //four random points on the facemesh. it doesn't really matter if they're duplicate, it adds to the randomness!
        //convert them to an integer with int() because otherwise the p5js random goes crazy
        let r1 = int(random(face.length));
        let r2 = int(random(face.length));
        let r3 = int(random(face.length));
        let r4 = int(random(face.length));
        let r5 = int(random(face.length));

        //randomized array update to these new randoms
        randomized = [face[r1], face[r2], face[r3], face[r4], face[r5]];
    }
}

//funny little short animation drawn while the flash is happening (when display is false)
function drawKeypoints() {
    for(let i = 0; i < randomized.length; i++) {
        push();
        fill(255);
        ellipseMode(CENTER);
        stroke(0);
        strokeWeight(1);
        ellipse(randomized[i][0], randomized[i][1], 5, 5);
        pop();
    }
}

//'camera' flash effect draw
function drawBlind() {
    if(blind > 0) {
        push();
        rectMode(CENTER);
        noStroke();
        fill(255, 255, 255, blind);
        rect(width/2, height/2, width, height);
        pop();
    }
}

//countdown draw
function drawCountdown() {
    push();
    stroke(0);
    strokeWeight(3);
    textAlign(CENTER, CENTER);
    textSize(54);
    fill(255);
    text(countdown, width/2, height/2);
    pop();
}

//draw the dialogue transcript from the timeline
function drawTranscript() {
    push();
    stroke(0);
    strokeWeight(3);
    textAlign(CENTER, CENTER);
    textWrap(WORD);
    textSize(24);
    fill(255);
    //p5js text wrap always offsets it in such a weird way, idk why it does that. 225 to make up for offset
    text(timeline[ti], width/2-225, height/2+150, 450);
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
    randomize(); //randomized animation

    //set very short interval mid-flash in which it predicts the face
    if(blind < 201) predicting = false;

    if(blind <= -250) { //goes a bit over 0 for the random animation
        blind = 0;
        clearInterval(flash);
        randomized = []; //empty randomized so it doesnt print during the next countdown
        checkResults();
    }
}

//user advances dialogue in timeline with mouseclick
function mousePressed() {
    if(state == 'predicting' && display) checkTimeline();
}