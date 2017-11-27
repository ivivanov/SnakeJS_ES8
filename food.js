class Food {
    constructor(canvas, boardSizeMultiplier, objectSize) {
        this.ctx = canvas.getContext("2d");
        this.canvasWidth = canvas.width;
        this.canvasHeight = canvas.height;
        this.boardSizeMultiplier = boardSizeMultiplier;
        this.objectSize = objectSize;
        this.position = this._getRandomPosition();
        this._drowFood(this.objectSize / 2);
        this.isEaten = false;
    }

    _getRandomPosition() {
        //coordinates -> circle center
        //[0,0] -> [10,10]
        //[20,20] -> [30,30]
        //[rnd*20, rnd*20] ->[res+10,res+10]
        //[rnd*objectSize,rnd*objectSize] -> [res+objectSize/2,res+objectSize/2]
        //rnd range [0, boardSizeMultiplier] 
        let xMult = this._getRandomInt(0, this.boardSizeMultiplier);
        let yMult = this._getRandomInt(0, this.boardSizeMultiplier);
        let x = this.objectSize * xMult;
        let y = this.objectSize * yMult;

        return [x, y];
    }

    _getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }

    _drowFood(radius) {
        var centerX = this.position[0] + radius;
        var centerY = this.position[1] + radius;

        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        this.ctx.fillStyle = 'green';
        this.ctx.fill();
    }

    clearFood() {
        this.ctx.fillStyle = "lightgreen";
        this.ctx.fillRect(this.position[0], this.position[1], this.objectSize, this.objectSize);
    }

    eatFood(){
        this.isEaten = true;
        this.ctx.fillStyle = "blue";
        this.ctx.fillRect(this.position[0], this.position[1], this.objectSize, this.objectSize);
    }
}