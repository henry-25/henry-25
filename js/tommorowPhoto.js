function calculateSecondsToMidnight() {
	var now = new Date();
	var hoursLeft = 23 - now.getHours();
	var minutesLeft = 59 - now.getMinutes();
	var secondsLeft = 59 - now.getSeconds();

	if (minutesLeft < 10) {
		minutesLeft = "0" + minutesLeft;
	}
	if (secondsLeft < 10) {
		secondsLeft = "0" + secondsLeft;
	}

	$("#secondsUntilMidnight").html(hoursLeft + ":" + minutesLeft + ":" + secondsLeft);
}

calculateSecondsToMidnight();
setInterval(calculateSecondsToMidnight, 1000);