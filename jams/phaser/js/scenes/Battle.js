class Battle extends Phaser.Scene {
    constructor() {
        super({
            key: 'battle'
        });
    }

    preload() {

    }

    create() {
        let main = this.scene.get('play');

        console.log('this is the battle scene!');
        main.txt.setText(`NOW, ONTO BATTLE!`);

        setTimeout(() => {
            main.txt.setText(`TO BE CONTINUED!!!!`);
        }, 1000);
    }

    update() {

    }
}