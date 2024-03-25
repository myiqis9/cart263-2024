class Play extends Phaser.Scene {
    constructor() {
        super({
            key: 'play'
        });
    }

    create() {
        //player's card inventory, the deck
        this.deck = [];

        //player's starting amount of coins
        this.coins = 10;

        //can player interact with game?
        this.canInteract = false;

        //create description box
        this.txtImg = this.add.image(0, 0, 'textbox');
        this.txt = this.add.text(-175, -65, `PICK A STARTER CARD.`, {
            fontFamily: 'pstart',
            fontSize: 14,
            color: '#548087',
            align: 'left',
            lineSpacing: 10,
            wordWrap: { width: 370 }
        });
        this.textbox = this.add.container(this.game.config.width/2+80, 400, [this.txtImg, this.txt]);
        this.textbox.setScale(0.8);

        //default parameters for stats displayed on each card
        //ADD THIS EVENTUALLY
        let param = {
            fontFamily: 'pstart',
            fontSize: 32,
            color: '#548087'
        }

        //create all existing cards in the game
        //stats need to be added after making the object because it takes the stats from the class. idk if I can structure this better
        this.card1 = this.add.container(this.game.config.width/2-150, -200, [this.add.image(0, 0, 'bg'), this.add.image(0, 0, 'saki')]);
        this.saki = new Card('saki', 2, 3, `HP: 2 ATK: 3 \nYOUR OTHER CARDS WILL ALWAYS RETAIN HAPPINESS AS LONG AS THIS CARD IS ALIVE.`, this.card1);

        this.card2 = this.add.container(this.game.config.width/2-150, -200, [this.add.image(0, 0, 'bg'), this.add.image(0, 0, 'emu')]);
        this.emu = new Card('emu', 6, 6, `HP: 6 ATK: 6 \nHIGH STATS, BUT GETS HUNGRY QUICKLY. IT WILL CANNIBALIZE OTHER PARTY MEMBERS IF IT HAS TO.`, this.card2);

        this.card3 = this.add.container(this.game.config.width/2-150, -200, [this.add.image(0, 0, 'bg'), this.add.image(0, 0, 'kasa')]);
        this.kasa = new Card('kasa', 5, 4, `HP: 5 ATK: 4 \nWILL DOUBLE FOOD / REST REWARDS, BUT IF IT IS LOW ON HAPPINESS EVEN ONCE, IT WILL KILL ITSELF.`, this.card3);

        this.card4 = this.add.container(this.game.config.width/2-150, -200, [this.add.image(0, 0, 'bg'), this.add.image(0, 0, 'nene')]);
        this.nene = new Card('nene', 4, 4, `HP: 4 ATK: 4 \nNOTHING SPECIAL ABOUT THIS ONE. JUST KEEP IT HAPPY AND WELL-FED.`, this.card4);

        this.card5 = this.add.container(this.game.config.width/2-150, -200, [this.add.image(0, 0, 'bg'), this.add.image(0, 0, 'rui')]);
        this.rui = new Card('rui', 3, 8, `HP: 3 ATK: 8 \nDEALS MASSIVE DAMAGE, BUT HAS A CHANCE TO ALSO HURT ALLIES.`, this.card5);

        this.card6 = this.add.container(this.game.config.width/2-150, -200, [this.add.image(0, 0, 'bg'), this.add.image(0, 0, 'kana')]);
        this.kana = new Card('kana', 2, 5, `HP: 2 ATK: 4 \nEXTREMELY RESILIENT, WILL SURVIVE LOW HUNGER / EXHAUSTION, BUT VERY LOW DEFAULT HEALTH.`, this.card6);
        
        this.card7 = this.add.container(this.game.config.width/2-150, -200, [this.add.image(0, 0, 'bg'), this.add.image(0, 0, 'mafu')]);
        this.mafu = new Card('mafu', 4, 5, `HP: 4 ATK: 5 \nCAN KEEP FIGHTING AT LOW HAPPINESS, BUT DRAINS FAST IN EXHAUSTION.`, this.card7);

        this.card8 = this.add.container(this.game.config.width/2-150, -200, [this.add.image(0, 0, 'bg'), this.add.image(0, 0, 'mizu')]);
        this.mizu = new Card('mizu', 5, 5, `HP: 5 ATK: 5 \nTAKES DOUBLE TIME TO REST FROM EXHAUSTION, BUT REQUIRES LESS FOOD.`, this.card8);
        
        //add them all to an array, lower their scale, then shuffle it
        this.allCards = [this.saki, this.emu, this.kasa, this.nene, this.rui, this.kana, this.mafu, this.mizu];
        for(let card of this.allCards) card.container.setScale(0.7);
        Phaser.Utils.Array.Shuffle(this.allCards);

        //grab first 3 as the starters
        this.cardSelection = [this.allCards[0], this.allCards[1], this.allCards[2]];

        //card animation
        this.cardAppear(this.cardSelection);

        //interactivity with the starter cards
        for(let card of this.cardSelection) {
            card.container.setSize(165, 177); //interaction box
            card.container.setInteractive(); //makes them able to interact
            card.container.on('pointerover', () => {
                if(this.canInteract) {
                    console.log(card.name);
                    this.txt.setText(card.description);
                }
            });

            card.container.on('pointerout', () => {
                if(this.canInteract) this.txt.setText('');
            });

            card.container.on('pointerdown', () => {
                if(this.canInteract) this.addCard(card);
            });
        }
    }

    cardAppear(cards) {
        //update the x position for the cards
        cards[1].container.x += 150;
        cards[2].container.x += 300;

        //tween the cards to appear from out of bounds in order (chain)
        this.tweens.chain({
            tweens: [
                {
                    targets: cards[0].container,
                    y: 200,
                    duration: 200
                },
                {
                    targets: cards[1].container,
                    y: 200,
                    duration: 200
                },
                {
                    targets: cards[2].container,
                    y: 200,
                    duration: 200
                }
            ]
        });

        //the player can now interact with cards
        this.canInteract = true;
    }

    addCard(card) {
        console.log('adding card');
        this.canInteract = false;

        //removes added card from the cardSelection list to enable tween below
        //and from allCards so that it doesn't get rolled again in the future.
        //not sure how to write this more effectively??
        let i1 = this.cardSelection.indexOf(card);
        this.cardSelection.splice(i1, 1);
        let i2 = this.allCards.indexOf(card);
        this.allCards.splice(i2, 1);

        //add card to player deck
        this.deck.push(card);

        this.tweens.chain({
            tweens: [
                {
                    targets: [this.cardSelection[0].container, this.cardSelection[1].container],
                    y: -200,
                    duration: 200
                },
                {
                    targets: card.container,
                    x: 100,
                    y: 400,
                    duration: 200,
                    onComplete: this.changeScenes()
                }
            ]
        });
    }

    changeScenes() {
        this.txt.setText(``);

        setTimeout(() => {
            this.scene.launch('battle');
        }, 500);
    }

    /* 
    for aligning the deck cards
    Phaser.Actions.GridAlign(cards, {
            width: 4,
            height: 1,
            cellWidth: 80,
            cellHeight: 150,
            x: 100,
            y: 400
        });
    */
} 