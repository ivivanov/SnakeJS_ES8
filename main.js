{
    'use strict';

    //init canvas
    let canvasDiv = document.getElementById("game-board");
    let canvas = document.createElement("canvas");
    let objectSize = 20;
    let boardSizeMultiplier = 25;
    canvas.width = objectSize * boardSizeMultiplier;
    canvas.height = objectSize * boardSizeMultiplier;
    canvasDiv.appendChild(canvas);

    let ctx = canvas.getContext("2d");
    ctx.fillStyle = "lightgreen";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let snake = new Snake(canvas, objectSize);


    let lastMove = MoveEnum.RIGHT;
    window.addEventListener("keydown", key => {
        if (key.code == "ArrowLeft") lastMove = lastMove == MoveEnum.RIGHT ? MoveEnum.RIGHT : MoveEnum.LEFT;
        if (key.code == "ArrowRight") lastMove = lastMove == MoveEnum.LEFT ? MoveEnum.LEFT : MoveEnum.RIGHT;
        if (key.code == "ArrowUp") lastMove = lastMove == MoveEnum.DOWN ? MoveEnum.DOWN : MoveEnum.UP;
        if (key.code == "ArrowDown") lastMove = lastMove == MoveEnum.UP ? MoveEnum.UP : MoveEnum.DOWN;
        var z = 0;
    }, false);

    let food = null;

    let intervalId = setInterval(() => {
        snake.move(lastMove);
        snake.checkForCollisions(intervalId, food);
        snake._drawBody();
    }, 100);

    setInterval(() => {
        if (!Object.is(food, null)) {
            food.clearFood();
        }
        food = new Food(canvas, boardSizeMultiplier, objectSize);
    }, 3000)


    // setTimeout(() => {
    //     foodArr.pop().clearFood();
    // }, 2000);
}   