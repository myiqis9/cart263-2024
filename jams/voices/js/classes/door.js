//door obstacle - they need a key to open. only visible once revealed
class Door extends Obstacle {
    constructor(x, y, color) {
        super(x, y);
        this.name = 'door';
        this.color = color;
    }

    //display door
    display() {
        push();
        if(this.visible) {
            fill(COLORS[this.color][0], COLORS[this.color][1], COLORS[this.color][2]);
            noStroke();
            rect(this.x, this.y, this.size);
        }
        pop();
    }

    string() {
        return `${this.color} ${this.name}`;
    }
}