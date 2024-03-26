class Card {
    constructor(data, scene) {
        //card information
        this.scene = scene;
        this.name = data.name;
        this.hp = data.hp;
        this.atk = data.atk;
        this.ability = data.ability;
        
        //stuff for display
        this.container = null;
        this.hpTxt = null;
        this.atkTxt = null;
        this.description = `HP: ${this.hp} ATK: ${this.atk} \n${this.ability}`;

        //wellness stats
        this.happiness = 5;
        this.hunger = 5;
        this.exhaustion = 5;
    }

    //create the container for the card
    createContainer() {
        //parameters for text on card
        const param = {
            fontFamily: 'pstart',
            fontSize: 32,
            color: '#548087'
        }

        //separate values for hp and atk text, since we're going to access these later on
        this.hpTxt = this.scene.add.text(-75, 55, this.hp, param);
        this.atkTxt = this.scene.add.text(45, 55, this.atk, param);

        //create container that has everything in the card
        this.container = this.scene.add.container(this.scene.game.config.width/2-150, -200, [this.scene.add.image(0, 0, 'bg'), this.scene.add.image(0, 0, this.name),
        this.hpTxt, this.atkTxt]);
    }

    //updates HP/ATK values on the card display
    updateValues() {
        this.hpTxt.setText(this.hp);
        this.atkTxt.setText(this.atk);
    }
}