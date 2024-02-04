class Wall extends Obstacle {
    constructor(x, y) {
        super(x, y);
        this.name = 'wall';
    }

    display() {
        push();
        fill(0);
        noStroke();
        rect(this.x, this.y, this.size);
        pop();
    }

    checkDistance() {
        let d = dist(this.x, this.y, mouseX, mouseY);
        if(d < this.size/2) console.log('this is a wall');
    }
}