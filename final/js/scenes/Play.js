//sets up the UI for the game, and is always open. every other scene will be launched alongside this one
class Play extends Phaser.Scene {
    constructor() {
        super({
            key: 'play'
        });

        //all cards information
        this.cardData = [
        {
            name: 'saki',
            hp: 2,
            atk: 3, 
            ability: `YOUR OTHER CARDS WILL ALWAYS RETAIN HAPPINESS AS LONG AS THIS CARD IS ALIVE.`
        },
        {
            name: 'emu',
            hp: 6,
            atk: 6, 
            ability: `HIGH STATS, BUT GETS HUNGRY QUICKLY. IT WILL CANNIBALIZE OTHER PARTY MEMBERS IF IT HAS TO.`
        },
        {
            name: 'kasa',
            hp: 5,
            atk: 4, 
            ability: `WILL DOUBLE FOOD / REST REWARDS, BUT IF IT IS LOW ON HAPPINESS EVEN ONCE, IT WILL KILL ITSELF.`
        },
        {
            name: 'nene',
            hp: 4,
            atk: 4, 
            ability: `NOTHING SPECIAL ABOUT THIS ONE. JUST KEEP IT HAPPY AND WELL-FED.`
        },
        {
            name: 'rui',
            hp: 3,
            atk: 8, 
            ability: `DEALS MASSIVE DAMAGE, BUT HAS A CHANCE TO ALSO HURT ALLIES.`
        },
        {
            name: 'kana',
            hp: 2,
            atk: 4, 
            ability: `EXTREMELY RESILIENT, WILL SURVIVE LOW HUNGER / EXHAUSTION, BUT VERY LOW DEFAULT HEALTH.`
        },
        {
            name: 'mafu',
            hp: 4,
            atk: 5,
            ability: `CAN KEEP FIGHTING AT LOW HAPPINESS, BUT DRAINS FAST IN EXHAUSTION.`
        },
        {
            name: 'mizu',
            hp: 5,
            atk: 5,
            ability: `TAKES DOUBLE TIME TO REST FROM EXHAUSTION, BUT REQUIRES LESS FOOD.`
        }
        ];
    }

    create() {
        //create player
        this.player = new Player(this);

        //create description box
        this.player.createTextbox();

        //create all existing cards in the game
        for(let data of this.cardData) {
            const card = new Card(data, this);
            card.createContainer();
            this.player.allCards.push(card);
        }
        
        //lower all cards scale, then shuffle them
        for(let card of this.player.allCards) card.container.setScale(0.7);
        Phaser.Utils.Array.Shuffle(this.player.allCards);
        console.log(this.player.allCards);

        this.startGame();
    }

    startGame() {
        this.scene.launch('select', this.player);
    }
} 