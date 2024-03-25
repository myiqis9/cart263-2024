class Card {
    constructor(name, hp, atk, description, container) {
        //card information
        this.name = name;
        this.hp = hp;
        this.atk = atk;
        this.description = description;
        this.container = container;

        //wellness stats
        this.happiness = 5;
        this.hunger = 5;
        this.exhaustion = 5;
    }
}