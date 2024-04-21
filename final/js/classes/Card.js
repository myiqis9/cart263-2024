class Card {
    constructor(data, scene) {
        //card information
        this.scene = scene;
        this.name = data.name;
        this.hp = data.hp;
        this.maxhp = data.hp;
        this.atk = data.atk;
        this.ability = data.ability;
        
        //stuff for display
        this.container = null;
        this.hpTxt = null;
        this.atkTxt = null;
        this.description = `HP: ${this.hp} ATK: ${this.atk} \n${this.ability}`;

        //wellness stats
        this.joy = 5;
        this.hunger = 5;
        this.energy = 5;
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

        this.container.setSize(165, 177); //interaction box
        this.container.setInteractive(); //makes them able to interact
    }

    stats() {
        return `JOY: ${this.joy} HUNGER: ${this.hunger} ENERGY: ${this.energy} \n${this.ability}`;
    }

    //updates HP/ATK values on the card display
    updateValues() {
        this.hpTxt.setText(this.hp);
        this.atkTxt.setText(this.atk);
    }

    //damage taken in battle
    takeDamage() {
        //loses health
        this.hp--;
        this.updateValues();

        //has a 70% chance to lose happiness every time it's hit
        let lose = Phaser.Math.Between(1, 10);
        console.log(`joy randomizer: ${lose}`);
        if(lose > 3 && this.joy > 0) this.joy--;
    }

    //checks happiness 
    isHappy() {
        if(this.joy == 0 && this.name !== 'mafu') {
            //has a 70% chance to refuse to fight
            let lose = Phaser.Math.Between(1, 10);
            console.log(`will it attack? ${lose}`);
            if(lose > 3) return false;
            else return true;
        }
        else return true;
    }

    //check exhaustion & hunger
    isFedRested() {

    }

    //individual skills and special events for each card will be contained here

    emu() {
        
    }

    rui() {

    }

    kasa() {

    }

    mafu() {

    }

    kana() {

    }
}