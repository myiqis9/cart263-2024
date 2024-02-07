class Key extends Obstacle {
    constructor(x, y, color) {
        super(x, y);
        this.name = 'key';
        this.color = color;
        this.size = TILE_SIZE/2;
    }

    display() {
        push();
        fill(COLORS[this.color][0], COLORS[this.color][1], COLORS[this.color][2]);
        strokeWeight(2);
        ellipseMode(CORNER);
        ellipse(this.x + this.size/2, this.y + this.size/2, this.size);
        pop();
    }

    string() {
        return `${this.color} ${this.name}`;
    }
}