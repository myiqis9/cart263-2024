//shop scene
class Shop extends Phaser.Scene {
    constructor() {
        super({
            key: 'shop'
        });
    }

    //grab player info
    init(data) {
        this.player = data;
    }

    create() {
        //if you've gotten to the shop, then the tutorial sequence is over
        if(this.player.tutorial) this.player.tutorial = false;

        this.checkMoves();
    }

    checkMoves() {
        if(this.player.selection > 0) {
            this.player.text.setText(`WELCOME TO THE SHOP!`);
            this.displayShop();
        }
        else {
            this.goToBattle();
        }
    }

    displayShop() {
        //nothing for now, so let's just say the player selects a card again
        setTimeout(() => {
            this.scene.start('select', this.player);
        }, 1000);
    }

    goToBattle() {
        setTimeout(() => {
            this.player.round++; //move player to next enemy round
            this.player.selection = 2; //reset player selection for next shop
            this.scene.start('battle', this.player);
        }, 700);
    }
}