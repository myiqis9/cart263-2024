//shop scene
class Shop extends Phaser.Scene {
    constructor() {
        super({
            key: 'shop'
        });

        this.btnTxt = [
            ["FEED", "1 COIN"],
            ["REST", "10 MIN"],
            ["UPGRADE", "1 COIN"],
            ["ROLL NEW", "5 COINS"],
        ];

        this.buttons = [];
    }

    //grab player info
    init(data) {
        this.player = data;
    }

    create() {
        //if you've gotten to the shop, then the tutorial sequence is over
        if(this.player.tutorial) this.player.tutorial = false;
        this.createButtons();
        this.checkMoves();
    }

    createButtons() {
        const param1 = {
            fontFamily: 'pstart',
            fontSize: 15,
            color: '#548087',
            align: 'center'
        };

        const param2 = {
            fontFamily: 'pstart',
            fontSize: 11,
            color: '#548087',
            align: 'center'
        };

        //create each button
        for(let btn of this.btnTxt) {
            let btnbg = this.add.image(0, 0, 'button');
            let btntxt1 = this.add.text(0, -10, btn[0], param1).setOrigin(0.5);
            let btntxt2 = this.add.text(0, 15, btn[1], param2).setOrigin(0.5);

            let newBtn = this.add.container(0, 0, [btnbg, btntxt1, btntxt2]).setAlpha(100);
            newBtn.setScale(0.9);

            //make button interactive
            newBtn.setSize(175, 75); //interaction box
            newBtn.setInteractive(); //makes them able to interact

            //hovering shows more info and tints container
            newBtn.on('pointerover', () => {
                if(this.player.canInteract) {
                    btnbg.setTint(0x87adb3);
                    btntxt1.setTint(0x87adb3);
                    btntxt2.setTint(0x87adb3);
                    this.player.text.setText('Button description here');
                }
            });

            //cancel hover
            newBtn.on('pointerout', () => {
                if(this.player.canInteract) {
                    btnbg.clearTint();
                    btntxt1.clearTint();
                    btntxt2.clearTint();
                    this.player.text.setText('');
                }
            });

            this.buttons.push(newBtn);
        }

        //reposition them properly
        this.buttons[0].setPosition(this.game.config.width/2-100, this.game.config.height/2-150);
        this.buttons[1].setPosition(this.game.config.width/2-100, this.game.config.height/2-60);
        this.buttons[2].setPosition(this.game.config.width/2+100, this.game.config.height/2-150);
        this.buttons[3].setPosition(this.game.config.width/2+100, this.game.config.height/2-60);
        
        //usability
        this.buttons[0].on('pointerdown', () => {
            if(this.player.canInteract) this.feed();
        });

        this.buttons[1].on('pointerdown', () => {
            if(this.player.canInteract) this.rest();
        });

        this.buttons[2].on('pointerdown', () => {
            if(this.player.canInteract) this.upgrade();
        });

        this.buttons[3].on('pointerdown', () => {
            if(this.player.canInteract) this.roll();
        });
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
        this.player.canInteract = true;
        console.log('hi');
    }

    feed() {
        console.log('feed');
    }

    rest() {
        console.log('rest');
    }

    upgrade() {
        console.log('upgrade');
    }

    roll() {
        console.log('roll');
    }

    goToBattle() {
        setTimeout(() => {
            this.player.round++; //move player to next enemy round
            this.player.selection = 2; //reset player selection for next shop
            this.scene.start('battle', this.player);
        }, 700);
    }
}