//card selection scene
class Select extends Phaser.Scene {
    constructor() {
        super({
            key: 'select'
        });
    }

    //grab player info
    init(data) {
        this.player = data;
    }

    create() {
        this.getCardSelection();
    }

    //create selection from all cards
    getCardSelection() {
        //grab first 3 as the starters
        this.cardSelection = [this.player.allCards[0], this.player.allCards[1], this.player.allCards[2]];

        //card animation
        this.cardAppear(this.cardSelection);

        //interactivity with the starter cards
        for(let card of this.cardSelection) {
            card.container.setSize(165, 177); //interaction box
            card.container.setInteractive(); //makes them able to interact

            //hovering shows card desc
            card.container.on('pointerover', () => {
                if(this.canInteract) {
                    console.log(card.name);
                    this.player.text.setText(card.description);
                }
            });

            //cancel hover
            card.container.on('pointerout', () => {
                if(this.canInteract) this.player.text.setText('');
            });

            //click on card
            card.container.on('pointerdown', () => {
                if(this.canInteract) this.addCard(card);
            });
        }
    }

    //animation that makes the selected cards show on screen
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
        let i1 = this.cardSelection.indexOf(card);
        this.cardSelection.splice(i1, 1);
        let i2 = this.player.allCards.indexOf(card);
        this.player.allCards.splice(i2, 1);

        //add card to player deck
        this.player.deck.push(card);

        //more tweening animations
        this.tweens.chain({
            tweens: [
                {
                    //other two cards go back oob
                    targets: [this.cardSelection[0].container, this.cardSelection[1].container],
                    y: -200,
                    duration: 200
                },
                {
                    //adds card to deck
                    targets: card.container,
                    x: 100,
                    y: 400,
                    duration: 200,
                    onComplete: this.changeScenes()
                }
            ]
        });
    }

    //change scene to battle
    changeScenes() {
        this.player.text.setText('');
        this.player.sortDeck();

        setTimeout(() => {
            if(this.player.tutorial) this.scene.start('battle', this.player);
            else this.scene.start('shop');
        }, 500);
    }
}
