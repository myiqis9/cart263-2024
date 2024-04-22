//funny little in between scene that contains all scenarios in which cards can die outside of combat
class Purgatory extends Phaser.Scene {
    constructor() {
        super({
            key: 'purgatory'
        });

        this.deathnote = [];
    }

    //grab player info
    init(data) {
        this.player = data;
    }

    create() {
        //straight to the point
        this.lifeOrDeath();
    }

    //for each card in deck, roll to see if it's going to die this turn
    lifeOrDeath() {
        for(let c of this.player.deck) {
            //if its alive, do nothing
            if(c.willLive()) continue;
            //otherwise add it to the death list
            this.deathnote.push(c);
        }

        //start death animation
        //if all survive, simply move on without anything happening here
        if(this.deathnote.length > 0) this.deathTrial();
        else this.moveToShop();
    }

    deathTrial() {
        this.player.displayCards(this.deathnote);

        let str;
        if(this.deathnote.length == 1) str = `${this.deathnote[0].name.toUpperCase()} HAS`;
        if(this.deathnote.length == 2) str = `${this.deathnote[0].name.toUpperCase()} AND ${this.deathnote[1].name.toUpperCase()} HAVE`;
        if(this.deathnote.length == 3) str = `${this.deathnote[0].name.toUpperCase()}, ${this.deathnote[1].name.toUpperCase()} AND ${this.deathnote[2].name.toUpperCase()} HAVE`;

        this.player.text.setText(`OH NO!!! \n${str} BEEN OVERWORKED IN BATTLE. DESPITE YOUR EFFORTS, THEY PERISHED NOT LONG AFTER.`);

        setTimeout(() => {
            this.anim();
        }, 500);
    }

    anim() {
        this.tweens.chain({
            targets: this.deathnote,
            tweens: [
                {
                    x: '-=25',
                    duration: 30
                },
                {
                    x: '+=50',
                    yoyo: true,
                    loop: 1,
                    duration: 50
                },
                {
                    x: '+=25',
                    duration: 30
                },
                {
                    duration: 50
                },
                {
                    y: '+=75',
                    alpha: 0,
                    duration: 50
                },
            ]
        });
    }

    moveToShop() {
        this.player.sortDeck();

        setTimeout(() => {
            this.scene.start('shop', this.player);
        }, 500);
    }
}