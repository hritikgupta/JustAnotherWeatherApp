var count = 0, flag = 1;
var temp_cels;
var tempUnit = 'C';
var ap = "https://fcc-weather-api.glitch.me/api/current?";
var lat, lon;


function randomQuote() {
    flag = 0;
    $.ajax({
        url: "https://api.forismatic.com/api/1.0/?",
        dataType: "jsonp",
        data: "method=getQuote&format=jsonp&lang=en&jsonp=?",
        success: function (response) {
            $(".randQuote").html("<p id='randQuote' class='lead text-center'>" +
              response.quoteText + "<br/><br/>&dash; " + response.quoteAuthor + " &dash;</p>");
        }
    });
}

$(function () {
    randomQuote();
});

$("#butt").click(function () {
    $(".love").find('i').css("color", "black");
    count = 0;
    randomQuote();
});

$(".love").click(function () {
    $(this).find('i').css("color", "red");
    if (count % 2 != 0)
        $(this).find('i').css("color", "black");
    count++;
});


function findLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            lat = "lat=" + position.coords.latitude;
            lon = "lon=" + position.coords.longitude;
            findWeather(lat, lon);
        });
    }
    else
        console.log("Can't find location!");
}

function findWeather(lat, lon) {
    var urlS = ap + lat + "&" + lon;
    $.ajax({
        url: urlS,
        success: function (response) {
            $("#city").text(response.name + ",");
            $("#country").text(response.sys.country);
            temp_cels = Math.round(response.main.temp * 10) / 10;
            $("#temp").text(temp_cels + " " + String.fromCharCode(176));
            $("#tempunit").text(tempUnit + " | ");
            $("#desc").text(response.weather[0].main);
        }
    });
}

// findLocation();