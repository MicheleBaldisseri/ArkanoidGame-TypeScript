var Collision = /** @class */ (function () {
    function Collision() {
    }
    Collision.prototype.isCollidingBrick = function (ball, brick) {
        if (ball.pos.x < brick.pos.x + brick.width &&
            ball.pos.x + ball.width > brick.pos.x &&
            ball.pos.y < brick.pos.y + brick.height &&
            ball.pos.y + ball.height > brick.pos.y) {
            return true;
        }
        return false;
    };
    Collision.prototype.isCollidingBricks = function (ball, bricks) {
        var _this = this;
        var colliding = false;
        bricks.forEach(function (brick, i) {
            if (_this.isCollidingBrick(ball, brick)) {
                ball.changeYDirection();
                if (brick.energy === 1)
                    bricks.splice(i, 1);
                else
                    brick.energy -= 1;
                colliding = true;
            }
        });
        return colliding;
    };
    Collision.prototype.checkBallCollisio = function (ball, paddle, view) {
        //check ball collision with paddle
        if (ball.pos.x + ball.width > paddle.pos.x &&
            ball.pos.x < paddle.pos.x + paddle.width &&
            ball.pos.y + ball.height === paddle.pos.y) {
            ball.changeYDirection();
        }
        //check ball collision with walls
        if (ball.pos.x > view.canvas.width - ball.width || ball.pos.x < 0)
            ball.changeXDirection();
        if (ball.pos.y < 0)
            ball.changeYDirection();
    };
    return Collision;
}());
export { Collision };
//# sourceMappingURL=Collision.js.map