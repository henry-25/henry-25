var key = "2c7a3e800f728824919dea862263e2fd";

$(document).ready(function() {
	var darkskyAttempt = $.ajax({url: "https://api.darksky.net/forecast/" + key + "/38.907192,-77.036873", type: "GET"})
		.done(function() {
			console.log("Success " + response);
		})
		.fail(function() {
			console.log("Fail")
		})
});