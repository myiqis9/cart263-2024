//battle scene
class Battle extends Phaser.Scene {
    constructor() {
        super({
            key: 'battle'
        });

        this.enemy = null;

        //how many moves player has each round
        this.moves = 2; 
    }

    //grab player info
    init(data) {
        this.player = data;
    }

    preload() {

    }

    create() {
        console.log('this is the battle scene!');

        //set the first character in the player deck as the active character by default
        this.active = this.player.deck[0]; 

        //grab active monster
        this.enemy = this.player.allEnemies[this.player.round];
        this.enemy.createContainer(this);

        //starter text when battle loads
        if(this.player.tutorial) this.player.text.setText(`NOW, ONTO BATTLE!`);
        else this.player.text.setText(`YOUR PARTY RUNS INTO ${this.enemy}`);

        setTimeout(() => {
            this.startBattle();
        }, 1000);
    }

    startBattle() {


        this.moveToActive(this.active);
    }

    moveToActive(card) {

    }

    battleMenu() {

    }

    update() {
        
    }
}