var url = "https://api.nasa.gov/planetary/apod?api_key=KEoX0OwgjCw9cPm5l2AnGWrcAkZXDqB7lRwcvPck";

$(document).ready(function() {
  $("#newDateParagraph").on("click", "#newDateReload", function() {
    var dateSelected = $("#dateSelected").val();
    var parseDate = dateSelected.split("-");
    $.ajax({
    method: "GET",
    url: url + "&date=" + parseDate[0] + "-" + parseDate[1] + "-" + parseDate[2],
    }).done(function(response) {
      if(response.copyright) {
        $("#copyright").text("Image Credits: " + response.copyright);
      } else {
        $("#copyright").text("Image Credits: " + "Public Domain");
      }
      if(response.media_type === "image") {
        $("#apod_img_id").attr("src", response.hdurl);
        $("#apod_vid_id").css("display", "none");
      } else {
        $("#apod_vid_id").attr("src", response.url);
        $("#apod_img_id").css("display", "none");
      }
      $("#apodTitle").text(response.title);
      $("#apodDescription").text(response.explanation);
      // console.log(response);
    }).fail(function(response) {
      console.log(response);
    });
  });
  var today = new Date();
  $.ajax({
    method: "GET",
    url: url + "&date=" + today.getUTCFullYear() + "-" + (today.getUTCMonth()+1) + "-" + today.getUTCDate(),
    }).done(function(response) {
      if(response.copyright) {
        $("#copyright").text("Image Credits: " + response.copyright);
      } else {
        $("#copyright").text("Image Credits: " + "Public Domain");
      }
      if(response.media_type === "image") {
        $("#apod_img_id").attr("src", response.hdurl);
        $("#apod_vid_id").css("display", "none");
      } else {
        $("#apod_vid_id").attr("src", response.url);
        $("#apod_img_id").css("display", "none");
      }
      $("#apodTitle").text(response.title);
      $("#apodDescription").text(response.explanation);
      // console.log(response);
    }).fail(function(response) {
      console.log(response);
  });

});