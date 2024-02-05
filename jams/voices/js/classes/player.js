class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = TILE_SIZE;
        this.moving = false;
        this.facing = 'down';
        this.distance = null;
        this.holding = [];
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

    //returns false if it has any obstacle in front of it,
    //otherwise returns true to being able to move
    canMove() {
        if(this.checkObstacle()) return false;

        //has player moved specified distance?
        if(this.distance != null) {
            if(this.distance == 0) {
                this.distance = null;
                return false;
            }
            //print(this.distance);
            this.distance -= this.speed;
        }

        //player can move
        return true;
    }

    //checks if there's an obstacle in front of player and sets it as 'blocking' value
    checkObstacle() {
        let povX, povY;

        //checking where obstacle would be depending on where player is facing
        switch(this.facing) {
            case 'left':
                povX = player.x - TILE_SIZE;
                povY = player.y;
            break;
            case 'right':
                povX = player.x + TILE_SIZE;
                povY = player.y;
            break;
            case 'up':
                povX = player.x;
                povY = player.y - TILE_SIZE;
            break;
            case 'down':
                povX = player.x;
                povY = player.y + TILE_SIZE;
            break;
        }

        //is there obstacle blocking movement?
        for(let obs of obstacles) {
            if(obs.x == povX && obs.y == povY) {
                blocking = obs;
                return true;
            }
        }

        blocking = null; 
        return false; //no obstacle 
    }

    pickUp() {
        print('picking up item');
    }

    //display player
    display() {
        push();
        fill(250, 90, 90);
        noStroke();
        ellipseMode(CORNER);
        ellipse(this.x, this.y, this.size);
        pop();
    }
}