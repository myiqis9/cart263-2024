/**
Viviana Ema Radu
Speech library jam
*/

"use strict";
const TILE_SIZE = 30;
let voice = new p5.Speech();
let recognizer = new p5.SpeechRec();
let transcript = 'Give me instructions to help me escape this maze!';

//commands for voice recognition
const COMMANDS = [
    {
      "command": /(.*) (.*)/, 
      "callback": actionDirection
    },
    {
      "command": /(.*) (.*) (.*) (.*)/,
      "callback": actionSpaces
    },
    {
      "command": /(.*)/,
      "callback": actionResponse
    }
];

//numbers written out because voice recognition hates me
const NUMBERS = {
    'zero': 0, 'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5, 'six': 6, 'seven': 7, 'eight': 8, 'nine': 9
};
//thank you Pippin and Lee for the idea!

//colors for consistency
const COLORS = {
    'red': [250, 70, 70], 'green': [70, 250, 70], 'blue': [70, 70, 250], 'yellow': [250, 210, 70]
}

let player; //player AI character
let obstacles = []; //array of all obstacles in the maze
let blocking = null; //object blocking player

//maze generated from https://keesiemeijer.github.io/maze-generator/
//original generated maze can be found in assets/images/maze-noted.png - I transcribed it below :)
let world = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], //1
    [1,0,0,0,0,0,0,0,1,0,0,0,1,3,0,0,0,0,0,0,1], //2
    [1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,1,1,0,1,0,1], //3
    [1,0,1,3,1,0,1,0,0,0,2,0,0,0,0,0,0,0,1,0,1], //4
    [1,0,1,0,1,0,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1], //5
    [1,0,0,0,1,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,1], //6
    [1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,1,1,1,1,2,1], //6
    [1,0,0,0,1,3,1,0,0,0,1,0,1,0,0,0,0,0,0,0,1], //7
    [1,0,1,1,1,0,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1], //8
    [1,0,0,0,0,0,1,0,0,0,2,0,0,0,1,0,0,0,1,0,0], //9
    [1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,0,1,1,1,1,1], //10
    [1,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1], //11
    [1,0,1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,2,1], //12
    [1,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1], //13
    [1,0,1,1,1,1,1,0,1,1,1,2,1,0,1,0,1,0,1,0,1], //14
    [1,0,0,0,0,3,1,0,0,0,0,0,0,0,1,0,0,0,1,3,1], //15
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1] //16
]

//p5js setup 
function setup() {
    player = new Player(TILE_SIZE, TILE_SIZE);

    let canvasHeight = world.length * TILE_SIZE;
    let canvasWidth = (world[0].length * TILE_SIZE) + 60;
    createCanvas(canvasHeight, canvasWidth);
    createWalls();

    recognizer.continuous = true;
    recognizer.onResult = voiceResult;
    recognizer.start();

    voice.setVoice(`Microsoft Aria Online (Natural) - English (United States)`);
    voice.setRate(1.5);
    voice.setPitch(0.6);
}

/* 
* spaces on the map:
* 0 - walkable
* 1 - wall
* 2 - door
* 3 - key
* wall/key locations marked on maze-solved.png
*/
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
            case 2: let door = new Door((row * TILE_SIZE), (col * TILE_SIZE), random(['red', 'green', 'blue']));
                obstacles.push(door);
            break;
            case 3: let key = new Key((row * TILE_SIZE), (col * TILE_SIZE), random(['red', 'green', 'blue']));
                obstacles.push(key);
            break;
          }
        }
    }
}

//p5js draw
//draw maze & check player movement
function draw() {
    background(255);
    for(let obs of obstacles) obs.display();
    player.move();
    displayText();
}

//voice recognizer result function
function voiceResult() {
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
    switch(data[1]) {
        case 'go': case 'move': case 'go to the': case 'move to the':
            moving(data[2], 0);
        break;
        case 'look to your': case 'look': case 'turn': case 'turn to your':
            looking(data[2]);
        break;
    }
}

//which takes action [1], amount of spaces [2], word 'space' or 'spaces' [3], and direction [4]
//action can only be move, spaces can be 1 to 9
function actionSpaces(data) {
    if((data[1] == 'move' || data[1] == 'go') && (data[3] == 'space' || data[3] == 'spaces')) {
        let distance = null;

        //checks if parsed data would return as a number or not
        if(!isNaN(parseInt(data[2]))) distance = parseInt(data[2]);
        else distance = NUMBERS[data[2]];

        //if distance isn't still null after checking both options, move that distance
        print(distance);
        if(distance !== null) moving(data[4], distance);
    }
}

//all other actions thrown in here to have them all in one place
//actions which request a spoken response and/or item interaction
//what is blocking player, player picks up item, player uses item
function actionResponse(data) {
    switch(data[1]) {
        case 'hello': case 'hi':
            speaking(`Hello, player. I need your help to get out of here.`);
        break;
        case 'what can you do': case 'what can i ask you': case 'how can i help you':
            speaking(`I can move or look in any direction. You can specify \nhow many spaces I should move. I can also pick up items.`);
        break;
        case 'whats in front of you': case 'what do you see': case 'whats blocking you':
            if(blocking != null) speaking(`There is a ${blocking.String()} in front of me.`);
            else speaking(`There is nothing in front of me.`);
        break;
        case 'pick up the key': case 'can you pick it up': case 'pick it up':
            if(blocking != null && blocking.name == 'key') player.pickup(blocking);
            else speaking(`I can't pick that up.`);
        break;
        case 'open the door': case 'can you open the door': case 'can you open it': case 'open it':
            if(blocking != null && blocking.name == 'door' && player.unlock(blocking)) speaking(`I opened the door!`);
            else speaking(`I can't open this.`);
        break;
        case 'how many keys do you have': case 'whats in your inventory': case 'what items do you have': case 'which keys do you have':
            let inv = player.holding.join(", ");
            print(inv);
            if(inv != '') speaking(`I have the following keys on me: ${inv}.`);
            else speaking(`I don't have any keys on me.`);
        break;
    }
}

//reuse these for functions above
function moving(direction, distance) {
    switch(direction) {
        case 'left': case 'right': case 'down': case 'up':
            player.facing = direction;
            player.moving = true;
            if(distance > 0) player.distance = (distance * TILE_SIZE);
        break;
        case 'forward':
            player.moving = true;
            if(distance > 0) player.distance = (distance * TILE_SIZE);
        break;
        default:
            speaking(`I cannot go that way.`);
        break;
    }
}

function looking(direction) {
    switch(direction) {
        case 'left': case 'right': case 'down': case 'up':
            player.facing = direction;
            player.checkObstacle();
        break;
        default:
            speaking(`I cannot look that way.`);
        break;
    }
}

function speaking(text) {
    voice.speak(text);
    transcript = text;
}

function displayText() {
    push();
    textAlign(CENTER, TOP);
    textSize(18);
    text(transcript, width/2, height-48);
    pop();
}

function mousePressed() {
    //voice.listVoices();
}