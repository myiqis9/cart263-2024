class Key extends Obstacle {
    constructor(x, y, color) {
        super(x, y);
        this.name = 'key';
        this.color = color;
    }

    display() {
        push();
        fill(COLORS[this.color][0], COLORS[this.color][1], COLORS[this.color][2]);
        noStroke();
        ellipseMode(CORNER);
        ellipse(this.x, this.y, this.size);
        pop();
    }
}