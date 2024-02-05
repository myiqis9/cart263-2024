class Wall extends Obstacle {
    constructor(x, y) {
        super(x, y);
        this.name = 'wall';
    }

    //display wall
    display() {
        push();
        fill(0);
        noStroke();
        rect(this.x, this.y, this.size);
        pop();
    }
}