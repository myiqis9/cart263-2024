/**
Viviana Ema Radu
Speech library jam
*/

"use strict";
const TILE_SIZE = 30;
let voice = new p5.Speech();
let recognizer = new p5.SpeechRec();

const COMMANDS = [
    {
      "command": /(.*) (.*)/, 
      "callback": actionDirection
    },
    {
      "command": /(.*) (.*) (.*)/,
      "callback": actionSpaces
    },
    {
      "command": /(.*)/,
      "callback": actionResponse
    }
];

let player; //player AI character
let obstacles = []; //array of all obstacles in the maze
let blocking = null; //object blocking player

//maze generated from https://keesiemeijer.github.io/maze-generator/
//original generated maze can be found in assets/images - I transcribed it below :)
let world = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], //1
    [1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1], //2
    [1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,1,1,0,1,0,1], //3
    [1,0,1,0,1,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0,1], //4
    [1,0,1,0,1,0,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1], //5
    [1,0,0,0,1,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,1], //6
    [1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,1,1,1,1,1,1], //6
    [0,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,0,0,0,0,1], //7
    [1,0,1,1,1,0,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1], //8
    [1,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0], //9
    [1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,0,1,1,1,1,1], //10
    [1,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1], //11
    [1,0,1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1], //12
    [1,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1], //13
    [1,0,1,1,1,1,1,0,1,1,1,0,1,0,1,0,1,0,1,0,1], //14
    [1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0,1], //15
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1] //16
]

//p5js setup 
function setup() {
    player = new Player((7 * TILE_SIZE), 0);

    let canvasHeight = (world.length) * TILE_SIZE;
    let canvasWidth = (world[0].length) * TILE_SIZE;
    createCanvas(canvasHeight, canvasWidth);
    createWalls();

    recognizer.continuous = true;
    recognizer.onResult = talking;
    recognizer.start();
}

function createWalls() {
    for (let row = 0; row < world.length; row++) {
        for (let col = 0; col < world[row].length; col++) {
          let tile = world[row][col];
          switch(tile) {
            case 0: //walkable empty space
              break;
            case 1: let wall = new Wall((row * TILE_SIZE), (col * TILE_SIZE)); //wall
                obstacles.push(wall);
              break;
          }
        }
    }
}

//p5js draw
//draw maze & check player movement
function draw() {
    background(255);

    for(let obs of obstacles) {
        obs.display();
        obs.checkDistance();
    }
    player.move();
}

//voice recognizer result function
function talking() {
    if (recognizer.resultValue && !player.moving) {
        //set text to all lowercase and punctuation free
        let spoken = recognizer.resultString.toLowerCase().replace(/[\.',?!]/g, '');
        console.log(spoken);

        for(let command of COMMANDS) {
            let match = spoken.match(command.command);
            console.log(match);

            if (match != null && match.length > 1) {
                command.callback(match);
            }
        }
    }
}

//which takes one action [1] and a direction [2]
//actions: move, look
//directions: left, right, up, down
function actionDirection(data) {

}

//which takes action [1], amount of spaces [2], and direction [3]
//action can only be move, spaces can be 1 to 5
function actionSpaces(data) {

}

//all other actions thrown in here to have them all in one place
//actions which request a spoken response and/or item interaction
//what is blocking player, player picks up item, player uses item
function actionResponse(data) {
    if(blocking != null) {
        switch(data[1]) {
            case 'whats in front of you': case 'what do you see': case 'whats blocking you':
                voice.speak(`There is a ${blocking.name} in front of me.`);
            break;
            case 'pick up the key': case 'can you pick it up': case 'pick it up':
                if(blocking.name == 'key') player.pickUp(blocking);
                else voice.speak(`I can't pick that up.`);
            break;
        }
    }
}

//reuse these for functions above
function moving(data) {
    let direction = data[1];
    switch(direction) {
        case 'left': case 'right': case 'down': case 'up':
            player.facing = direction;
            player.moving = true;
            if(data.length > 2) player.distance = (parseInt(data[2]) * TILE_SIZE);
        break;
        case 'forward':
            player.moving = true;
            if(data.length > 2) player.distance = (parseInt(data[2]) * TILE_SIZE);
        break;
        default:
            voice.speak(`I cannot go that way.`);
        break;
    }
}

function looking(data) {
    let direction = data[1];
    switch(direction) {
        case 'left': case 'right': case 'down': case 'up':
            player.facing = direction;
        break;
        default:
            voice.speak(`I cannot look that way.`);
        break;
    }
}

function mousePressed() {
    
}