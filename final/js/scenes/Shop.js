//shop scene
class Shop extends Phaser.Scene {
    constructor() {
        super({
            key: 'shop'
        });
    }

    preload() {

    }

    create() {
        const main = this.scene.get('play');

        console.log('this is the shop scene!');
    }

    update() {

    }
}