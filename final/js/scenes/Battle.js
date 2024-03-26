//battle scene
class Battle extends Phaser.Scene {
    constructor() {
        super({
            key: 'battle'
        });

        this.enemy = '';
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

        //how many moves player has each round
        this.moves = 2; 

        //starter text when battle loads
        if(this.player.tutorial) this.player.text.setText(`NOW, ONTO BATTLE!`);
        else this.player.text.setText(`YOUR PARTY RUNS INTO ${this.enemy}`);

        setTimeout(() => {
            this.startBattle();
        }, 1000);
    }

    startBattle() {

    }

    battleMenu() {

    }

    update() {
        
    }
}