class Keypoint {
    constructor(name, x, y) {
        this.name = name;
        this.x = x;
        this.y = y;
    }

    //all functions are checked from mouth top point being 'this'
    checkHappy(mLeft, mRight) {
        print('checking happy');
        if(mLeft.y < this.y && mRight.y < this.y) print('happy!!!');
        else print('not happy :(');
    }

    checkFrown(mLeft, mRight) {

    }

    checkSurprised(mBottom) {
        print('checking mouth open');
        let d = dist(this.x, this.y, mBottom.x, mBottom.y);
        if(d > 3) print('mouth open!!!');
        else print('not open :(');
    }

    checkOverjoyed(mBottom, mLeft, mRight) {

    }
}