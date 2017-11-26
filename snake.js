let MoveEnum = {
    UP: 0,
    DOWN: 1,
    LEFT: 2,
    RIGHT: 3,
}


class Snake {
    constructor(canvasCtx, canvasWidth, canvasHeight) {
        this.ctx = canvasCtx;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.partSize = 20;
        this.body = new SnakeBody();
        this._createDemoBody();
    }

    move(direction) {
        //up    x,y-
        //down  x,y+
        //left  x-,y
        //right x+,y
        this.body.popback();// remove tail
        let head = this.body.head;
        let newHead = [0, 0];

        if (direction == MoveEnum.UP)
            newHead = [head[0], head[1] - this.partSize];
        if (direction == MoveEnum.DOWN)
            newHead = [head[0], head[1] + this.partSize];
        if (direction == MoveEnum.LEFT)
            newHead = [head[0] - this.partSize, head[1]];
        if (direction == MoveEnum.RIGHT)
            newHead = [head[0] + this.partSize, head[1]];

        this.body.pushfront(newHead);
    }

    checkForCollisions(){
        //check if snake body collides with itself
        //check if snake hits the wall
    }

    _drawBody() {
        let forRemove = this.body.forRemove.pop();
        while (!Object.is(forRemove, undefined)) {
            this._clearPart(forRemove[0], forRemove[1]);
            forRemove = this.body.forRemove.pop();
        }
        for (const part of this.body) {
            this._drawPart(part[0], part[1]);
        }
    }

    _drawPart(x, y) {
        this.ctx.fillStyle = "lightblue";
        this.ctx.fillRect(x, y, this.partSize, this.partSize);
    }

    _clearPart(x, y) {
        this.ctx.fillStyle = "green";
        this.ctx.fillRect(x, y, this.partSize, this.partSize);
    }

    _createDemoBody() {
        this.body.pushfront([this.partSize, this.partSize]);
        this.body.pushfront([this.partSize, this.partSize * 2]);
        this.body.pushfront([this.partSize, this.partSize * 3]);
        this.body.pushfront([this.partSize * 2, this.partSize * 3]);
        this.body.pushfront([this.partSize * 3, this.partSize * 3]);
        this.body.pushfront([this.partSize * 3, this.partSize * 4]);
    }
}