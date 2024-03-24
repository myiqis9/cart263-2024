class Card {
    constructor(scene, name, hp, atk, description, container) {
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

        //card position
        this.x = 0;
        this.y = 0;
    }
}