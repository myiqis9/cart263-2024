//shop feed scene
class Feed extends Phaser.Scene {
    constructor() {
        super({
            key: 'feed'
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
        }, 200);
    }

    UIappear() {
        this.player.backToShop(this);
    }

    UIremove() {
        
    }
}