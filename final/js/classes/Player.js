//class that contains all player information that will remain consistent and passed along through scenes
class Player {
    constructor(scene) {
        //scene param
        this.scene = scene;

        //player's card inventory, the deck
        this.deck = [];

        //player's starting amount of coins
        this.coins = 10;

        //can player interact with game?
        this.canInteract = false;

        //are we currently in the tutorial/first scene?
        this.tutorial = true;
        
        //how many battles has the player gone through? / level count
        this.round = 0;

        //deck of all cards in the game
        this.allCards = [];

        //list of all enemies
        this.allEnemies = [];

        //textbox
        this.textbox = null;

        //textbox text
        this.text;
    }
    
    createTextbox() {
        let txtImg = this.scene.add.image(0, 0, 'textbox');

        this.text = this.scene.add.text(-175, -65, `PICK A STARTER CARD.`, {
            fontFamily: 'pstart',
            fontSize: 14,
            color: '#548087',
            align: 'left',
            lineSpacing: 10,
            wordWrap: { width: 370 }
        });

        this.textbox = this.scene.add.container(this.scene.game.config.width/2+80, 400, [txtImg, this.text]);
        this.textbox.setScale(0.8);
    }

    //sort the player's deck display
    sortDeck() {
        Phaser.Actions.GridAlign(this.deck, {
            width: 4,
            height: 1,
            cellWidth: 80,
            cellHeight: 150,
            x: 100,
            y: 400
        });
    }
}