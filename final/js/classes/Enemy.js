class Enemy {
    constructor(data) {
        this.name = data.name;
        this.hp = data.hp;

        this.container = null;
        this.hpTxt = null;
    }

    createContainer(scene) {
        //parameters for text on card
        const param = {
            fontFamily: 'pstart',
            fontSize: 36,
            color: '#548087'
        }

        //separate values for hp and atk text, since we're going to access these later on
        this.hpTxt = scene.add.text(45, 40, this.hp, param);

        //create container that has everything in the card
        this.container = scene.add.container(scene.game.config.width/2, 160, [scene.add.image(0, 0, this.name), this.hpTxt]);
        this.container.setScale(0.9);
    }

    //updates HP value on the card display
    updateValues() {
        this.hpTxt.setText(this.hp);
    }
}