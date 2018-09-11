var url = "https://api.nasa.gov/neo/rest/v1/feed?";
var apiKey = "KEoX0OwgjCw9cPm5l2AnGWrcAkZXDqB7lRwcvPck";

$(document).ready(function() {
	$("#newDatesParagraph").on("click", "#asteroidDataReload", function() {
    var startDateSelected = $("#startDateSelect").val();
    var startParseDate = startDateSelected.split("-");
    var endDateSelected = $("#endDateSelect").val();
    var endParseDate = endDateSelected.split("-");
    $.ajax({
		  method: "GET",
		  url: url + "start_date=" + startDateSelected + "&end_date=" + endDateSelected + "&api_key=" + apiKey,
		  }).done(function(response) {
		  	$("#asteroidDataTable > tbody").empty();
		  	var neo = response.near_earth_objects;
		  	for(i in neo) {
		  		for(j in neo[i]) {
		  			$("#asteroidDataTable > tbody:last-child").append("<tr><td>" + neo[i][j].name + "</td><td>" + neo[i][j].close_approach_data[0].close_approach_date + "</td><td>" + neo[i][j].close_approach_data[0].miss_distance.miles + " miles</td><td>" + neo[i][j].close_approach_data[0].relative_velocity.miles_per_hour + " mph</td></tr>");
		  		}
		  	}
		    console.log(response);
		  }).fail(function(response) {
		  	alert("Please enter two valid dates within 7 days of eachother.");
		    console.log(response);
		  });
  });
});