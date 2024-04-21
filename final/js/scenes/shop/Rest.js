//shop rest scene
class Rest extends Phaser.Scene {
    constructor() {
        super({
            key: 'rest'
        });
    }

    //grab player info
    init(data) {
        this.player = data;
    }

    create() {
        this.player.displayDeck();

        setTimeout(() => {
            this.UIappear();
        }, 150);
    }

    UIappear() {
        this.player.backToShop(this);

        this.timer = this.add.text(this.game.config.width/2, this.game.config.height/2+10, `COINS: ${this.player.coins}`, this.player.param1);
    }
}