//shop upgrade scene
class Upgrade extends Phaser.Scene {
    constructor() {
        super({
            key: 'upgrade'
        });

        this.up = '';
    }

    //grab player info
    init(data) {
        this.player = data;
    }

    create() {
        this.player.displayDeck();
        this.flipCoin();

        setTimeout(() => {
            this.UIappear();
        }, 200);
    }

    //are we upgrading health or atk?
    flipCoin() {
        //metaphorically of course. were doing this the inscryption way. the funger way if you will
        let coin = Phaser.Math.Between(0, 1);
        if(coin == 0) this.up = 'HP';
        if(coin == 1) this.up = 'ATK';
    }

    UIappear() {
        this.player.backToShop(this);

        //text displayed on the screen
        this.cText = this.add.text(this.game.config.width/2, this.game.config.height/2+10, `COINS: ${this.player.coins}`, this.player.param1).setAlpha(0);
        this.upText = this.add.text(this.game.config.width/2, this.game.config.height/2-170, `UPGRADING ${this.up}...`, this.player.param1).setAlpha(0);
        this.cText.setOrigin(0.5);
        this.upText.setOrigin(0.5);

        this.tweens.add({
            targets: [this.cText, this.upText],
            alpha: 1,
            duration: 150,
            onComplete: () => { this.player.canInteract = true; }
        });

        for(let card of this.player.deck) {
            card.container.on('pointerdown', () => {
                if(this.player.coins > 1) this.upgrading(card);
                else this.player.text.setText(`SORRY, YOU'RE OUT OF COINS!`);
            });
        }
    }

    upgrading() {
        
    }

    UIremove() {
        
    }
}