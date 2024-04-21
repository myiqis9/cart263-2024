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
        }, 100);
    }

    UIappear() {
        this.player.backToShop(this);
    }
}