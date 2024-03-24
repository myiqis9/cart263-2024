class Boot extends Phaser.Scene {
    constructor() {
        super({
            key: 'boot'
        });
    }

    preload() {
        this.preloaded = false;

        //saki, emu, kasa, nene, rui, kana, mafu, mizu
        this.load.spritesheet('cards', 'assets/images/proto_spritesheet.png', {
            frameWidth: 175,
            frameHeight: 192
        })

        this.load.image('textbox', 'assets/images/textbox.png');
        this.load.image('bg', 'assets/images/bg.png');
        this.load.image('saki', 'assets/images/saki.png');
        this.load.image('emu', 'assets/images/emu.png');
        this.load.image('kasa', 'assets/images/kasa.png');
        this.load.image('nene', 'assets/images/nene.png');
        this.load.image('rui', 'assets/images/rui.png');
        this.load.image('kana', 'assets/images/kana.png');
        this.load.image('mafu', 'assets/images/mafu.png');
        this.load.image('mizu', 'assets/images/mizu.png');

        this.load.on('complete', this.start);
    }

    create() {
        this.loadtxt = this.add.text(100, 200, 'Loading...', {
            fontFamily: 'sans-serif',
            fontSize: 16,
            color: '#ffffff'
        });
        this.loadtxt.visible = true;
    }

    start() {
        setTimeout(() => {
            this.scene.start('play');
        }, 500);
    }

    update() {

    }
}