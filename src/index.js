import { Collision } from './Collision';
import { Paddle } from './sprites/Paddle';
import { Ball } from './sprites/Ball';
import { CanvasView } from './view/CanvasView';
//images
import PADDLE_IMAGE from './images/paddle.png';
import BALL_IMAGE from './images/ball.png';
//level and colors
import { PADDLE_SPEED, PADDLE_WIDTH, PADDLE_HEIGHT, PADDLE_STARTX, BALL_SPEED, BALL_SIZE, BALL_STARTX, BALL_STARTY } from './setup';
//helpers
import { createBrick } from './helper';
var gameOver = false;
var score = 0;
function setGameOver(view) {
    view.drawInfo('Game Over!');
    gameOver = false;
}
function setGameWin(view) {
    view.drawInfo('Game won!');
    gameOver = false;
}
function gameLoop(view, bricks, paddle, ball, collision) {
    view.clear();
    view.drawBricks(bricks);
    view.drawSprite(paddle);
    view.drawSprite(ball);
    //move ball
    ball.moveBall();
    //move paddle and check so it won't exit the playfiel
    if ((paddle.isMovingLeft && paddle.pos.x > 0) ||
        (paddle.isMovingRight && paddle.pos.x < view.canvas.width - paddle.width)) {
        paddle.movePaddle();
    }
    collision.checkBallCollisio(ball, paddle, view);
    var collidingBrick = collision.isCollidingBricks(ball, bricks);
    if (collidingBrick) {
        score += 1;
        view.drawScore(score);
    }
    if (ball.pos.y > view.canvas.height)
        gameOver = true;
    if (bricks.length === 0)
        return setGameWin(view);
    if (gameOver)
        return setGameOver(view);
    requestAnimationFrame(function () { return gameLoop(view, bricks, paddle, ball, collision); });
}
function startGame(view) {
    //reset display
    score = 0;
    view.drawInfo('');
    view.drawScore(0);
    //create bricks
    var bricks = createBrick();
    //create paddle
    var paddle = new Paddle(PADDLE_SPEED, PADDLE_WIDTH, PADDLE_HEIGHT, {
        x: PADDLE_STARTX,
        y: view.canvas.height - PADDLE_HEIGHT - 5
    }, PADDLE_IMAGE);
    //create ball
    var ball = new Ball(BALL_SPEED, BALL_SIZE, {
        x: BALL_STARTX,
        y: BALL_STARTY
    }, BALL_IMAGE);
    //create collision instance 
    var collision = new Collision();
    gameLoop(view, bricks, paddle, ball, collision);
}
var view = new CanvasView('#playField');
view.initStartButton(startGame);
//# sourceMappingURL=index.js.map