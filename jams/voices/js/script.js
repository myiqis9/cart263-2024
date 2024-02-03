/**
Viviana Ema Radu
Speech library jam
*/

"use strict";
let voice = new p5.Speech();
let recognizer = new p5.SpeechRec();

let player; //player AI character
let obstacles = []; //array of all obstacles in the maze
let blocking = null; //object blocking player


//p5js setup
function preload() {

}


//p5js setup
function setup() {
    player = new Player(100, 100);
    createCanvas(700, 600);
    background(0);
}


//draw maze & check player movement & check talking
function draw() {
    for(let obs of obstacles) obs.draw();
    player.move();
    talking();
}

function talking() {

}

function mousePressed() {
    
}