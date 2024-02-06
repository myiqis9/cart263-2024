class Obstacle {
    constructor(x, y) {
        this.name = '';
        this.x = x;
        this.y = y;
        this.size = TILE_SIZE;
        this.visible = false;
    }

    String() {
        return this.name;
    }

    makeVisible() {
        this.visible = true;
    }
}