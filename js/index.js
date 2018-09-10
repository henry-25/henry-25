var colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
		  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
		  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
		  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
		  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
		  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
		  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
		  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
		  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
		  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballColor;
var ballRadius = 10;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var shape = colorBall;

$(document).ready(function () {
	$('#nextPageRow').hide();
	$('#changeBallColorClick').click(function() {
		changeBallColor();
	})
	$('#changeBallDirectionClick').click(function() {
		changeBallDirection();
	})
	$('#randomizeBallDirectionClick').click(function() {
		randomizeBallDirection();
	})
	$('#stopBallClick').click(function() {
		stopBall();
	})
	$('#startBallClick').click(function() {
		startBall();
	})
});

function colorBall(color) {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  colorBall(ballColor);
  
  if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
  	dx = -dx;
  }
  if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
    dy = -dy;
  }
  
  x += dx;
  y += dy;
}

function changeBallColor() {
	ballColor = colorArray[Math.floor(Math.random() * colorArray.length - 1)];
}

function changeBallDirection() {
	dx = -dx;
	dy = -dy;
}

function randomizeBallDirection() {
	dx = Math.random() * (5 + 5) - 5;
	dy = Math.random() * (5 + 5) - 5;
}

function stopBall() {
	dx = 0;
	dy = 0;
	checkBallLocation();
}

function startBall() {
	dx = 2;
	dy = -2;
	$('#nextPageRow').hide();
	// document.getElementById("nextPageRow").style["display"] = "none";
}

function checkBallLocation() {
	if(checkCorners(x, y)) {
		$('#nextPageRow').show();
		// document.getElementById("nextPageRow").style["display"] = "block";
		changeBallColor();
	} else {
		console.log(canvas.width, canvas.height, x, y);
	}
}

function checkCorners(xCord, yCord) {
	if(xCord < 30 && yCord < 30) {
		return true;
	} else if (xCord < 30 && yCord > 120) {
		return true;
	} else if (xCord > 270 && yCord < 30) {
		return true;
	} else if (xCord > 270 && yCord > 120) {
		return true;
	} else {
		return false;
	}
}

setInterval(draw, 20);