//global class that all obstacles inherit from
class Obstacle { 
    constructor(x, y) {
        this.name = '';
        this.x = x;
        this.y = y;
        this.size = TILE_SIZE;
        this.visible = false;
    }

    string() {
        return this.name;
    }

    makeVisible() {
        this.visible = true;
    }
}