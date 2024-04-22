/*
Final Project
Viviana Ema Radu

This is my final project!
As shown in my prototype, it's a roguelike card battler. I've expanded to now have a shop,
unique abilities for almost every card, and card stats you need to take care of so they don't die!

Since I haven't gotten the chance to finish everything I wanted (more about this in Player.js),
I'm continuing it in this new repository: https://github.com/myiqis9/cart263-2024/tree/main/won_dun 

Otherwise, the game is fairly thorough and pretty hard on its own. Good luck!
*/

"use strict";

let config = {
    type: Phaser.AUTO,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 720,
    height: 520,
    backgroundColor: '#d3dcdd',
    physics: {
        default: 'arcade'
    },
    scene: [Boot, Play, Select, Battle, Purgatory, Shop, Rest, Feed, Upgrade]
};

let game = new Phaser.Game(config);