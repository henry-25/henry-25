var canvas = document.getElementById("snakeGrid");
var ctx = canvas.getContext("2d");
var canvasWidth = canvas.offsetWidth;
var canvasHeight = canvas.offsetHeight;
var snakeSize = 10;
var score = 0;
var snake;
var food;
ctx.strokeStyle = "#ddd";

$(document).ready(function() {
	var btn = $("#btn");
	btn.on("click", function() {
		drawEverything.init();
	});
	document.onkeydown = function(event) {
		keyCode = window.event.keyCode;
		keyCode = event.keyCode;
		if (keyCode === 37) {
			if (direction != "right") {
				direction = "left";
			}
		} else if (keyCode === 39) {
			if (direction != "left") {
				direction = "right";
			}
		} else if (keyCode === 38) {
			if (direction != "down") {
				direction = "up";
			}
		} else if (keyCode === 40) {
			if (direction != "up") {
				direction = "down";
			}
		}
	}
});


var drawEverything = (function() {
	var snakeBody = function(x, y) {
		ctx.fillStyle = "white";
		ctx.fillRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
		ctx.fillStyle = "black";
		ctx.strokeRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
	}

	var targetSquare = function(x, y) {
		ctx.fillStyle = 'yellow';
    ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
		ctx.fillStyle = 'red';
		ctx.fillRect(x*snakeSize+1, y*snakeSize+1, snakeSize-2, snakeSize-2);
	}

	var scoreText = function() {
		var score_text = "Score: " + score;
    ctx.fillStyle = 'blue';
    ctx.fillText(score_text, 145, canvasHeight-5);
	}

	var drawSnake = function() {
		var length = 4;
		snake = [];
		for (var i = length; i >= 0; i--) {
			snake.push({x:i, y:0});
		}
	}

	var createFood = function() {
		food = {
			x: Math.floor((Math.random() * 30)),
			y: Math.floor((Math.random() * 15))
		}

		for (var i = 0; i > snake.length; i++) {
			var snakeX = snake[i].x;
			var snakeY = snake[i].y;

			if (food.x === snakeX || food.y === snakeY || food.y === snakeY && food.x === snakeX) {
				food.x = Math.floor((Math.random() * 30));
				food.y = Math.floor((Math.random() * 15));
				console.log(food.x, food.y);
			}
		}
	}

	var checkCollision = function(x, y, array) {
		for (var i = 0; i < array.length; i++) {
			if (array[i].x === x && array[i].y === y) {
				return true;
			}
		}
		return false;
	}

	var paint = function() {
		ctx.fillStyle = "lightgrey";
		ctx.fillRect(0, 0, canvasWidth, canvasHeight);
		ctx.strokeStyle = "black";
		ctx.strokeRect(0, 0, canvasWidth, canvasHeight);

		btn.setAttribute("disabled", true);

		var snakeX = snake[0].x;
		var snakeY = snake[0].y;

		if (direction == "right") {
			snakeX++;
		} else if (direction == "left") {
			snakeX--;
		} else if (direction == "up") {
			snakeY--;
		} else if (direction == "down") {
			snakeY++;
		}

		if (snakeX == -1 || snakeX == 30 || snakeY == -1 || snakeY == 15 || checkCollision(snakeX, snakeY, snake)) {
			btn.removeAttribute("disabled", true);
			ctx.clearRect(0, 0, canvasWidth, canvasHeight);
			gameloop = clearInterval(gameloop);
			alert("Game Over!");
			return;
		}

		if (snakeX == food.x && snakeY == food.y) {
			var tail = {
				x: snakeX,
				y: snakeY
			}
			score++;
			createFood();
		} else {
			var tail = snake.pop();
			tail.x = snakeX;
			tail.y = snakeY;
		}

		snake.unshift(tail);

		for (var i = 0; i < snake.length; i++) {
			snakeBody(snake[i].x, snake[i].y);
		}

		targetSquare(food.x, food.y);
		scoreText();
	}

	var init = function() {
		direction = "down";
		drawSnake();
		createFood();
		gameloop = setInterval(paint, 80);
	}

	return {
		init: init
	};
}());