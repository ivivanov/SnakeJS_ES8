{
    'use strict';
    
    //init canvas
    let canvasDiv = document.getElementById("game-board");
    let canvas = document.createElement("canvas");
    let snakePartSize = 20;
    canvas.width = snakePartSize * 35;
    canvas.height = snakePartSize * 35;
    canvasDiv.appendChild(canvas);

    let ctx = canvas.getContext("2d");
    let snake = new Snake(ctx, canvas.width, canvas.height);
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, canvas.width, canvas.height);


    let lastMove = MoveEnum.RIGHT;
    window.addEventListener("keydown", key => {
        if (key.code == "ArrowLeft") lastMove = MoveEnum.LEFT;
        if (key.code == "ArrowRight") lastMove = MoveEnum.RIGHT;
        if (key.code == "ArrowUp") lastMove = MoveEnum.UP;
        if (key.code == "ArrowDown") lastMove = MoveEnum.DOWN;
        var z = 0;
    }, false);

    let intervalId = setInterval(() => {
        // if (head[0] >= this.width - this.partSize || head[1] >= this.height - this.partSize) {
        //     console.log("wall crash");
        //     clearInterval(intervalId);
        // }
        snake.move(lastMove);

        snake._drawBody();

    }, 200);

   
 }   