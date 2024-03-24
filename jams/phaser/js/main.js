/**
Phaser 3 Jam
Viviana Ema Radu

This is a preparation for my final project.
*/

"use strict";

let config = {
    type: Phaser.AUTO,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 600,
    height: 520,
    physics: {
        default: 'arcade'
    },
    scene: [Boot, Play]
};

let game = new Phaser.Game(config);