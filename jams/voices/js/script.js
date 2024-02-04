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
      "command": /go (.*)/, 
      "callback": moving
    },
    {
      "command": /move (.*) by (.*)/,
      "callback": moving
    },
    {
      "command": /look to your (.*)/,
      "callback": looking
    },
    {
      "command": /whats in front of you/,
      "callback": speaking
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


//draw maze & check player movement & check talking
function draw() {
    background(255);

    for(let obs of obstacles) {
        obs.display();
        obs.checkDistance();
    }
    player.move();
}

function talking() {
    if (recognizer.resultValue && !player.moving) {
        for(let command of COMMANDS) {
            //set text to all lowercase and punctuation free
            let spoken = recognizer.resultString.toLowerCase().replace(/[\.',?!]/g, '');
            let match = spoken.match(command.command);
            console.log(spoken);
            console.log(match);

            if (match != null && match.length > 1) {
                command.callback(match);
            }
        }
    }
}

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

function speaking() {
    voice.speak(`There is a ${blocking.name} in front of me.`);
}

function mousePressed() {
    
}