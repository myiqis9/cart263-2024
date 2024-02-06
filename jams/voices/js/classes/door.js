class Door extends Obstacle {
    constructor(x, y, color) {
        super(x, y);
        this.name = 'door';
        this.color = color;
    }

    //display door
    display() {
        push();
        fill(COLORS[this.color][0], COLORS[this.color][1], COLORS[this.color][2]);
        noStroke();
        rect(this.x, this.y, this.size);
        pop();
    }
}