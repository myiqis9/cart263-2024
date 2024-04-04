//battle scene
class Battle extends Phaser.Scene {
    constructor() {
        super({
            key: 'battle'
        });

        this.enemy = null;

        //how many moves player has each round
        this.moves = 2;
    }

    //grab player info
    init(data) {
        this.player = data;
    }

    create() {
        console.log('this is the battle scene!');

        //set the first character in the player deck as the active character by default
        this.active = this.player.deck[0]; 

        //grab active monster
        this.enemy = this.player.allEnemies[this.player.round];
        this.enemy.createContainer(this);

        //starter text when battle loads
        if(this.player.tutorial) this.player.text.setText(`NOW, ONTO BATTLE!`);
        else this.player.text.setText(`YOUR PARTY RUNS INTO AN ENEMY ${this.enemy.name.toUpperCase()}!`);

        setTimeout(() => {
            this.startBattle();
        }, 1000);
    }

    startBattle() {
        console.log(`active card: ${this.active.name}`);

        this.tweens.chain({
            tweens: [
                {
                    //move active card to active slot
                    targets: this.active.container,
                    x: this.game.config.width/2-156,
                    y: 160,
                    duration: 200
                },
                {
                    //adds card to deck
                    targets: this.enemy.container,
                    x: this.game.config.width/2+100,
                    duration: 1000,
                    onComplete: () => { this.battleMenu() }
                }
            ]
        });
    }

    battleMenu() {
        console.log('battle starts');
        this.player.canInteract = true;
        this.updateText(); 
        this.setCardInteraction();
    }

    setCardInteraction() {
        for(let card of this.player.deck) {
            //reset existing interaction
            card.container.off('pointerdown');

            if(card == this.active) {
                //click on active card to attack
                card.container.on('pointerdown', () => {
                    if(this.player.canInteract) this.attack();
                });
            }
            else {
                //click on other cards in deck, to swap
                card.container.on('pointerdown', () => {
                    if(this.player.canInteract) this.swap(card);
                });
            }
        }
    }

    attack() {
        console.log('player attacking!');

        //player can't interact during animations
        this.player.canInteract = false;

        //remove move count, and set attack text
        this.moves--;
        this.player.text.setText(`YOU DEAL ${this.active.atk} DAMAGE!`);

        //animations: card reaches forward and attacks, on complete this does damage
        //monster shakes a bit. then active card goes back into position
        this.tweens.chain({
            tweens: [
                {
                    targets: this.active.container,
                    x: this.game.config.width/2-136,
                    duration: 70,
                    onComplete: () => { this.enemy.takeDamage(this.active.atk) }
                },
                {
                    targets: this.enemy.container,
                    x: this.game.config.width/2+95,
                    ease: 'Quintic.easeInOut',
                    duration: 30
                },
                {
                    targets: this.enemy.container,
                    x: this.game.config.width/2+115,
                    ease: 'Quintic.easeInOut',
                    duration: 70, 
                    yoyo: true,
                    repeat: 1
                },
                {
                    targets: this.enemy.container,
                    x: this.game.config.width/2+100,
                    ease: 'Quintic.easeInOut',
                    duration: 30
                },
                {
                    targets: this.active.container,
                    x: this.game.config.width/2-156,
                    duration: 100,
                    onComplete: () => {
                        //if enemy died then go to win scenario, else enemy attacks back
                        if(this.enemy.died) this.enemyDefeated();
                        else setTimeout(() => { 
                            if(this.moves > 0) this.reset();
                            else this.attacked(); 
                        }, 200);
                    }
                }
            ]
        });
    }

    attacked() {
        console.log('enemy attacking!');
        this.player.text.setText(`THE ENEMY STRIKES BACK!`);

        //animations: same thing as above but the enemy's the one attacking now
        this.tweens.chain({
            tweens: [
                {
                    targets: this.enemy.container,
                    x: this.game.config.width/2+85,
                    duration: 70,
                    onComplete: () => { this.active.takeDamage() }
                },
                {
                    targets: this.active.container,
                    x: this.game.config.width/2-151,
                    ease: 'Quintic.easeInOut',
                    duration: 30
                },
                {
                    targets: this.active.container,
                    x: this.game.config.width/2-171,
                    ease: 'Quintic.easeInOut',
                    duration: 70, 
                    yoyo: true,
                    repeat: 1
                },
                {
                    targets: this.active.container,
                    x: this.game.config.width/2-156,
                    ease: 'Quintic.easeInOut',
                    duration: 30
                },
                {
                    targets: this.enemy.container,
                    x: this.game.config.width/2+100,
                    duration: 100,
                    onComplete: () => {
                        //if active card died then call function, else reset new turn
                        if(this.active.hp <= 0) this.activeDied();
                        else {
                            this.moves = 2;
                            this.reset();
                        }
                    }
                }
            ]
        });
    }

    reset() {
        //player can interact again now
        this.updateText();
        this.player.canInteract = true;
    }

    swap(card) {
        console.log('swapping!');
    }

    enemyDefeated() {
        this.player.text.setText(`YOU HAVE DEFEATED THE ENEMY!`);
        this.tweens.add({
            targets: this.enemy.container,
            y: 210,
            alpha: 0,
            ease: 'Quintic.easeOut',
            duration: 800,
            onComplete: () => {
                this.battleComplete();
            }
        });
    }

    activeDied() {
        //died in battle
        this.player.text.setText(`OH NO! ${this.active.name.toUpperCase()} DIED IN COMBAT!`);
        this.tweens.add({
            targets: this.active.container,
            y: 210,
            alpha: 0,
            ease: 'Quintic.easeOut',
            duration: 800,
            onComplete: () => {
                this.setNewActive();
            }
        });
    }

    setNewActive() {
        this.active.container.destroy();
        this.player.deck.splice(0, 1);
        this.player.sortDeck();

        //since the sortDeck takes a bit of time, I need to let it finish first before playing this.
        setTimeout(() => {
            if(this.player.deck.length > 0) {
                //sets next first card in deck as new active
                this.active = this.player.deck[0]; 
                console.log(`setting ${this.active.name} as new active card`);
    
                this.tweens.add({
                    //move active card to active slot
                    targets: this.active.container,
                    x: this.game.config.width/2-156,
                    y: 160,
                    duration: 200,
                    onComplete: () => {
                        this.setCardInteraction();
                        this.moves = 2;
                        this.reset();
                    }
                });
            }
            else this.lost(); 
        }, 500);
    }

    battleComplete() {
        //destroy current enemy to not take up space, sort player's deck and heal all cards
        this.enemy.container.destroy();
        this.player.sortDeck();
        this.player.healAll();
        this.moves = 2; //reset move count for next battle

        //remove all card interactions
        for(let card of this.player.deck) {
            card.container.off('pointerdown');
        }

        //change to shop scene
        setTimeout(() => {
            this.scene.start('shop', this.player);
        }, 800);
    }

    lost() {
        setTimeout(() => {
            this.player.text.setText(`YOU HAVE NO MORE CARDS TO PLAY! YOU HAVE LOST.`);
        }, 1000);
    }

    updateText() {
        this.menutxt = `JOY: ${this.active.joy} HUNGER: ${this.active.hunger} ENERGY: ${this.active.energy} \nYOU HAVE ${this.moves} MOVES LEFT.\n\nCLICK ON ACTIVE CARD TO ATTACK OR CLICK ON ANOTHER CARD TO SWAP.`;

        this.player.text.setText(this.menutxt);
    }
}