//exit obstacle - always visible, crossing it ends the game!
class Exit extends Obstacle {
    constructor(x, y) {
        super(x, y);
        this.name = 'exit';
        this.color = 'yellow';
        this.size = TILE_SIZE/2;
    }

    //display wall
    display() {
        push();
        fill(COLORS[this.color][0], COLORS[this.color][1], COLORS[this.color][2]);
        strokeWeight(2);
        rect(this.x+this.size, this.y, this.size/2, this.size*2);
        pop();
    }
}