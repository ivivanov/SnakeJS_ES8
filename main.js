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
        if (key.code == "ArrowLeft") lastMove = lastMove == MoveEnum.RIGHT ? MoveEnum.RIGHT : MoveEnum.LEFT;
        if (key.code == "ArrowRight") lastMove = lastMove == MoveEnum.LEFT ? MoveEnum.LEFT : MoveEnum.RIGHT;
        if (key.code == "ArrowUp") lastMove = lastMove == MoveEnum.DOWN ? MoveEnum.DOWN : MoveEnum.UP;
        if (key.code == "ArrowDown") lastMove = lastMove == MoveEnum.UP ? MoveEnum.UP : MoveEnum.DOWN;
        var z = 0;
    }, false);

    let intervalId = setInterval(() => {
        snake.move(lastMove);
        snake.checkForCollisions(intervalId);
        snake._drawBody();

    }, 200);


}   