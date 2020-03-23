let searchBtn = document.getElementById("searchBtn");
let APIKey = "f4362f1bd34a536aafa14fd65dbfec83";

let today = new Date();
let date =
  "(" +
  today.getDate() +
  "-" +
  (today.getMonth() + 1) +
  "-" +
  today.getFullYear() +
  ")";

let cities = ["Ottawa", "Atlanta"];

document.getElementById("searchBtn").addEventListener("click", function(event) {
  let cityName = document.getElementById("citySearch").value;
  let queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=" +
    APIKey;
  let latitude;
  let longitude;

  fetch(queryURL)
    .then(function(result) {
      return result.json();
    })
    .then(function(data) {
      weatherIcon = document.getElementById("weatherIcon");
      weatherIcon.src =
        "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";

      $("#cityName").text(data.name + " " + date);
      $("#cityName").append(weatherIcon);
      let tempC = data.main.temp - 273.15;
      let tempF = (tempC * 9) / 5 + 32;
      $("#temp").text("Temperature: " + tempF + " F");
      $("#humidity").text("Humidity: " + data.main.humidity + " %");
      $("#wind").text("Wind: " + data.wind.speed * 2.23694 + " MpH");
      latitude = data.coord.lat;
      longitude = data.coord.lon;

      console.log(data);

      getUV(latitude, longitude);
    });
});
function getUV(latitude, longitude) {
  let UVqueryURL =
    "https://api.openweathermap.org/data/2.5/uvi?lat=" +
    latitude +
    "&lon=" +
    longitude +
    "&appid=" +
    APIKey;
  fetch(UVqueryURL)
    .then(function(result) {
      return result.json();
    })
    .then(function(UVdata) {
      console.log(UVdata);
      UVdata.value = $("#uv").text("UV Index: " + UVdata.value);

      if (UVdata.value <= 3) {
        $("#uv").attr("style", "background-color: green");
      } else if (3 < UVdata.value <= 5) {
        $("#uv").attr("style", "background-color: yellow");
      } else if (5 < UVdata.value <= 7) {
        $("#uv").attr("style", "background-color: orange");
      } else {
        $("#uv").attr("style", "background-color: red");
      }
    });
}
