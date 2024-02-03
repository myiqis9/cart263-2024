class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 50;
        this.moving = false;
        this.facing = 'up';
        this.speed = 5;
    }

    move() {
        //check if AI is still able to move or is blocked by obstacle
        //only if moving is already true, so it only starts moving when ordered to!
        if(this.moving) this.moving = this.canMove();

        //if it can indeed move, move it towards where it is facing 
        if(this.moving) {
            switch(this.facing) {
                case 'up': this.y -= this.speed;
                break;
                case 'down': this.y += this.speed;
                break;
                case 'left': this.x -= this.speed;
                break;
                case 'right': this.x += this.speed;
                break;
            }
        }

        //display character
        this.display();
    }

    //returns false if it has any obstacle in front of it, depending on which angle it is facing
    //otherwise returns true to being able to move
    canMove() {
        for(let obs of obstacles) {
            switch(this.facing) {
                case 'up': case 'down':
                    if(this.x > obs.x - obs.width/2 && this.x < obs.x + obs.width/2
                    && this.y + this.size/2 > obs.y - obs.height/2 
                    && this.y - this.size/2 < obs.y + obs.height/2) {
                        blocking = obs;
                        return false;
                    }
                break;

                case 'left': case 'right':
                    if(this.y > obs.y - obs.height/2 && this.y < obs.y + obs.height/2
                    && this.x + this.size/2 > obs.x - obs.width/2 
                    && this.x - this.size/2 < obs.x + obs.width/2) {
                        blocking = obs;
                        return false;
                    }
                break;
            }
        }
        return true;
    }

    display() {
        push();
        fill(250, 200, 220);
        stroke(0);
        ellipseMode(CENTER);
        ellipse(this.x, this.y, this.size);
        pop();
    }
}