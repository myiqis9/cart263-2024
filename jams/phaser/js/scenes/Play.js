class Play extends Phaser.Scene {
    constructor() {
        super({
            key: 'play'
        });

        //player's card inventory
        this.playerCards = [];

        //player's starting amount of coins
        this.coins = 10;
    }

    create() {
        //create all existing cards in the game
        this.card1 = this.add.container(this.game.config.width/2-170, 100, [this.add.image(0, 0, 'bg'), this.add.image(0, 0, 'saki')]);
        this.saki = new Card(this, 'saki', 2, 3, `HP: 2 ATK: 4 | your other cards will always retain happiness as long as this card is alive.`, this.card1);

        this.card2 = this.add.container(this.game.config.width/2-170, 100, [this.add.image(0, 0, 'bg'), this.add.image(0, 0, 'emu')]);
        this.emu = new Card(this, 'emu', 6, 6, `HP: 6 ATK: 6 | high stats, but gets hungry very fast. will cannibalize other party members if it has to.`, this.card2);

        this.card3 = this.add.container(this.game.config.width/2-170, 100, [this.add.image(0, 0, 'bg'), this.add.image(0, 0, 'kasa')]);
        this.kasa = new Card(this, 'kasa', 5, 4, `HP: 5 ATK: 4 | will double food/rest time, but if it is low on happiness even once, it will kill itself.`, this.card3);

        this.card4 = this.add.container(this.game.config.width/2-170, 100, [this.add.image(0, 0, 'bg'), this.add.image(0, 0, 'nene')]);
        this.nene = new Card(this, 'nene', 4, 4, `HP: 4 ATK: 4 | nothing special about this one. just keep it happy and well-fed.`, this.card4);


        this.card5 = this.add.container(this.game.config.width/2-170, 100, [this.add.image(0, 0, 'bg'), this.add.image(0, 0, 'rui')]);
        this.rui = new Card(this, 'rui', 3, 7, `HP: 3 ATK: 7 | deals massive damage, but has a chance to also hurt allies.`, this.card5);

        this.card6 = this.add.container(this.game.config.width/2-170, 100, [this.add.image(0, 0, 'bg'), this.add.image(0, 0, 'kana')]);
        this.kana = new Card(this, 'kana', 2, 5, `HP: 2 ATK: 4 | extremely resilient, will survive low hunger/exhaustion, but very low default health.`, this.card6);
        
        this.card7 = this.add.container(this.game.config.width/2-170, 100, [this.add.image(0, 0, 'bg'), this.add.image(0, 0, 'mafu')]);
        this.mafu = new Card(this, 'mafu', 4, 5, `HP: 4 ATK: 5 | can keep fighting at low happiness, but drains faster in hunger/exhaustion.`, this.card7);

        this.card8 = this.add.container(this.game.config.width/2-170, 100, [this.add.image(0, 0, 'bg'), this.add.image(0, 0, 'mizu')]);
        this.mizu = new Card(this, 'mizu', 5, 5, `HP: 3 ATK: 7 | deals massive damage, but has a chance to also hurt allies.`, this.card8);
        
        //add them all to an array, lower their scale, then shuffle it
        this.allCards = [this.saki, this.emu, this.kasa, this.nene, this.rui, this.kana, this.mafu, this.mizu];
        for(let card of this.allCards) card.container.setScale(0.8);
        Phaser.Utils.Array.Shuffle(this.allCards);

        //grab first 3 as the starters and make only those stay
        this.cardSelection = [this.allCards[0], this.allCards[1], this.allCards[2]];
        for(let card of this.cardSelection) card.container.visible = true;
    }

    update() {

    }

    /* 
    Phaser.Actions.GridAlign(cards, {
            width: 4,
            height: 2,
            cellWidth: 150,
            cellHeight: 200,
            x: 100,
            y: 100
        });
    */
} 