var url = "https://api.nasa.gov/planetary/apod?api_key=KEoX0OwgjCw9cPm5l2AnGWrcAkZXDqB7lRwcvPck";

$(document).ready(function() {
  $.ajax({
  method: "GET",
  url: url,
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
    console.log(response);
  }).fail(function(response) {
    console.log("Fail");
    console.log(response);
  });
});