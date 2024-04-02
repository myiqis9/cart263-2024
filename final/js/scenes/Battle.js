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
        console.log(this.active);
        this.tweens.chain({
            tweens: [
                {
                    //move active card to active slot
                    targets: this.active.container,
                    x: this.game.config.width/2-156,
                    y: 160,
                    duration: 200
                },
                {
                    //adds card to deck
                    targets: this.enemy.container,
                    x: this.game.config.width/2+100,
                    duration: 1000,
                    onComplete: () => { this.battleSetup() }
                }
            ]
        });
    }

    battleSetup() {
        console.log('battle starts');
        this.player.canInteract = true;

        for(let card of this.player.deck) {
            if(card == this.active) {
                //click on active card
                card.container.on('pointerdown', () => {
                    if(this.player.canInteract) this.attack();
                });
            }
            else {
                card.container.on('pointerdown', () => {
                    if(this.player.canInteract) this.swap(card);
                });
            }
        }
    }

    attack() {
        console.log('attacking!');
    }

    swap(card) {
        console.log('swapping!');
    }

    battleMenu() {

    }

    update() {
        
    }
}