var url = "https://api.nasa.gov/planetary/apod?api_key=KEoX0OwgjCw9cPm5l2AnGWrcAkZXDqB7lRwcvPck";

$(document).ready(function() {
  $("#newDateParagraph").on("click", "#newDateReload", function() {
    var dateSelected = $("#dateSelected").val();
    var parseDate = dateSelected.split("-");
    $.ajax({
    method: "GET",
    url: url + "&date=" + parseDate[0] + "-" + parseDate[1] + "-" + parseDate[2],
    }).done(function(response) {
      doneFunctionExecute(response);
    }).fail(function(response) {
      console.log(response);
      alert("Please enter a valid date after june 16, 1995 up to today!")
    });
  });

  var today = new Date();
  $.ajax({
    method: "GET",
    url: url + "&date=" + today.getUTCFullYear() + "-" + (today.getUTCMonth()+1) + "-" + today.getUTCDate(),
    }).done(function(response) {
      doneFunctionExecute(response);
    }).fail(function(response) {
      console.log(response);
  });

  $("#toggleDay").on("click", "#dayForwardReload", function() {
    var dateSelected = $("#dateSelected").val();
    dateSelected = getTommorow(dateSelected);
    var year = dateSelected.getUTCFullYear();
    var month = dateSelected.getUTCMonth() + 1;
    var day = dateSelected.getUTCDate();
    month = checkDateInputFormat(month);
    day = checkDateInputFormat(day);
    $("#dateSelected").val(year + "-" + month + "-" + day);
    $.ajax({
      method: "GET",
      url: url + "&date=" + year + "-" + month + "-" + day,
      }).done(function(response) {
        doneFunctionExecute(response);
      }).fail(function(response) {
        console.log(response);
        alert("You cannot navigate to a day after today.")
      });
  });

  $("#toggleDay").on("click", "#dayBackwardReload", function() {
    var dateSelected = $("#dateSelected").val();
    dateSelected = getYesterday(dateSelected);
    var year = dateSelected.getUTCFullYear();
    var month = dateSelected.getUTCMonth() + 1;
    var day = dateSelected.getUTCDate();
    month = checkDateInputFormat(month);
    day = checkDateInputFormat(day);
    $("#dateSelected").val(year + "-" + month + "-" + day);
    $.ajax({
      method: "GET",
      url: url + "&date=" + year + "-" + month + "-" + day,
      }).done(function(response) {
        doneFunctionExecute(response);
      }).fail(function(response) {
        console.log(response);
        alert("You cannot navigate before june 16, 1995.")
      });
  });
});


function getYesterday(date) {
  var parseDate = date.split("-");
  var date = new Date(parseDate[0], parseDate[1] - 1, parseDate[2]);
  date.setDate(date.getDate() - 1);
  return date;
}

function getTommorow(date) {
  var parseDate = date.split("-");
  var date = new Date(parseDate[0], parseDate[1] - 1, parseDate[2]);
  date.setDate(date.getDate() + 1);
  return date;
}

function doneFunctionExecute(response) {
  if(response.copyright) {
    $("#copyright").text("Image Credits: " + response.copyright);
  } else {
    $("#copyright").text("Image Credits: " + "Public Domain");
  }
  if(response.media_type === "image") {
    $("#apod_img_id").attr("src", response.hdurl);
    $("#apod_vid_id").css("display", "none");
    $("#apod_img_id").css("display", "inline-block");
  } else {
    $("#apod_vid_id").attr("src", response.url);
    $("#apod_img_id").css("display", "none");
    $("#apod_vid_id").css("display", "inline-block");
  }
  $("#apodTitle").text(response.title);
  $("#apodDescription").text(response.explanation);
}

function checkDateInputFormat(dateInput) {
  dateInput = Number(dateInput);
  if (dateInput < 10) {
    return "0" + dateInput;
  } else {
    return dateInput;
  }
}