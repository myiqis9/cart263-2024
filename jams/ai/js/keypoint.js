class Keypoint {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    //all functions are checked from mouth middle top point being 'this'
    checkHappy(mLeft, mRight) {
        print('checking happy');

        //calculate midpoint between two mouth corners on Y axis
        let midY = (mLeft.y + mRight.y)/2;
        print(`midpoint: ${midY} upper mouth: ${this.y}`);

        //if midpoint is same or higher than upper mouth part then youre smiling!
        if(midY <= this.y) return true;
        else return false;
    }

    checkFrown(mLeft, mRight) {
        print('checking frown');

        //calculate midpoint between two mouth corners on Y axis
        let midY = (mLeft.y + mRight.y)/2;
        print(`midpoint: ${midY} upper mouth: ${this.y}`);

        //if midpoint is lower than upper mouth part then youre frowning!
        //this one can be cheated in many ways, such as just opening your mouth. but that's kind of the point. :)
        if(midY > this.y) return true;
        else return false;
    }

    checkSurprised(mBottom) {
        print('checking surprised'); //mouth open

        //check distance between upper and lower lip
        let d = dist(this.x, this.y, mBottom.x, mBottom.y);
        print(`dist: ${d}`);

        //if distance is higher than 5 (approx number) then mouth is open!
        if(d > 5) return true;
        else return false;
    }

    checkOverjoyed(mBottom, mLeft, mRight, cLeft, cRight) {
        //ok bear with me
        print('checking overjoyed'); //mouth open AND smiling

        //it first checks if you're smiling
        //since the mouth is open the middle part of the mouth isnt a reliable reference point
        //so we compare the middle Y point between mouth corners with the middle Y point of both cheeks,
        //which would normally be lower with an open mouth unless the person is smiling!
        let midY = (mLeft.y + mRight.y)/2;
        let cheekY = (cLeft.y + cRight.y)/2;
        print(`mouth midpoint: ${midY} cheek midpoint: ${cheekY}`);

        if(midY < cheekY) { //if smile Y is higher than cheek Y
            //then, it checks if the mouth is also actually open
            let d = dist(this.x, this.y, mBottom.x, mBottom.y);
            print(`dist: ${d}`);

            if(d > 5) return true;
            else return false;
        }
    }
}