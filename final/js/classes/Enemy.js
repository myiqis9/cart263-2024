class Enemy {
    constructor(data) {
        this.name = data.name;
        this.hp = data.hp;
        this.txtX = data.x;
        this.txtY = data.y;

        this.container = null;
        this.hpTxt = null;
    }

    createContainer(scene) {
        //parameters for text on card
        const param = {
            fontFamily: 'pstart',
            fontSize: 37,
            color: '#548087',
            stroke: '#d3dcdd',
            strokeThickness: 5
        }

        //separate values for hp and atk text, since we're going to access these later on
        this.hpTxt = scene.add.text(this.txtX, this.txtY, this.hp, param);

        //create container that has everything in the card
        this.container = scene.add.container(scene.game.config.width+200, 160, [scene.add.image(0, 0, this.name), this.hpTxt]);
        this.container.setScale(0.9);
    }

    //updates HP value on the card display
    updateValues() {
        this.hpTxt.setText(this.hp);
    }
}