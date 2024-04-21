//shop upgrade scene
class Upgrade extends Phaser.Scene {
    constructor() {
        super({
            key: 'upgrade'
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