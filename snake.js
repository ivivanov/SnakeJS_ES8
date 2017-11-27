let MoveEnum = {
    UP: 0,
    DOWN: 1,
    LEFT: 2,
    RIGHT: 3,
}

class Snake {
    constructor(canvas, objectSize) {
        this.ctx = canvas.getContext("2d");
        this.canvasWidth = canvas.width;
        this.canvasHeight = canvas.Height;
        this.partSize = objectSize;
        this.body = new SnakeBody();
        this._createStartBody();
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

    checkForCollisions(intervalId, food) {
        let head = this.body.head;
        //check if snake body collides with itself
        for (let index = 0; index < this.body.body.length; index++) {
            const bodyPart = this.body.body[index];

            //check for food collision and eat the food : )
            if (!Object.is(food, null) &&!food.isEaten && bodyPart[0] == food.position[0] && bodyPart[1] == food.position[1]) {
                this.body.pushback(this.body.forClear.pop());
                food.eatFood();
            }

            if (index == 0) continue; //skip head

            if (bodyPart[0] == head[0] && bodyPart[1] == head[1]) {
                clearInterval(intervalId);
            }
        }

        //wall crash
        if (head[0] > this.canvasWidth //- this.partSize     //right wall x>=max-size
            || head[1] > this.canvasHeight// - this.partSize //down wall  y>=max-size
            || head[0] < 0 //left wall  x<=0+size
            || head[1] < 0 //up wall    y<=0+size
        )
            clearInterval(intervalId);
    }

    _drawBody() {
        let forClear = this.body.forClear.pop();
        while (!Object.is(forClear, undefined)) {
            this._clearPart(forClear[0], forClear[1]);
            forClear = this.body.forClear.pop();
        }
        for (const part of this.body) {
            this._drawPart(part[0], part[1]);
        }
    }

    _drawPart(x, y) {
        this.ctx.fillStyle = "blue";
        this.ctx.fillRect(x, y, this.partSize, this.partSize);
    }

    _clearPart(x, y) {
        this.ctx.fillStyle = "lightgreen";
        this.ctx.fillRect(x, y, this.partSize, this.partSize);
    }

    _createStartBody() {
        this.body.pushfront([this.partSize, this.partSize]);
        this.body.pushfront([this.partSize, this.partSize * 2]);
        this.body.pushfront([this.partSize, this.partSize * 3]);
        this.body.pushfront([this.partSize * 2, this.partSize * 3]);
        this.body.pushfront([this.partSize * 3, this.partSize * 3]);
        this.body.pushfront([this.partSize * 3, this.partSize * 4]);
    }
}