let searchBtn = document.getElementById("searchBtn");
let APIKey = "f4362f1bd34a536aafa14fd65dbfec83";
let cityName = document.getElementById("citySearch").value;

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
      $("#temp").text("Temperature: " + tempF.toFixed(1) + " F");
      $("#humidity").text("Humidity: " + data.main.humidity + " %");
      let windspeed = data.wind.speed * 2.23694;
      $("#wind").text("Wind: " + windspeed.toFixed(1) + " MpH");
      latitude = data.coord.lat;
      longitude = data.coord.lon;

      console.log(data);

      getUV(latitude, longitude);
      get5Day();
      searchHistory();
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

function searchHistory() {
  let cityName = document.getElementById("citySearch").value;
  let history = $("<button>");
  history.text(cityName);
  history.addClass("btn btn-warning");
  $("#cityList").prepend(history);
}

function get5Day() {
  let cityName = document.getElementById("citySearch").value;
  let forecastURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    cityName +
    "&appid=" +
    APIKey;
  fetch(forecastURL)
    .then(function(result) {
      return result.json();
    })
    .then(function(forecastData) {
      console.log(forecastData);

      $("#date1").text(forecastData.list[3].dt_txt);
      let tempC1 = forecastData.list[3].main.temp - 273.16;
      let tempF1 = (tempC1 * 9) / 5 + 32;
      $("#temp1").text("Temp: " + tempF1.toFixed(1) + " F");
      $("#hum1").text("Humidity: " + forecastData.list[3].main.humidity + "%");
      icon1 = document.getElementById("img1");
      icon1.src =
        "https://openweathermap.org/img/wn/" +
        forecastData.list[3].weather[0].icon +
        "@2x.png";

      $("#date2").text(forecastData.list[11].dt_txt);
      let tempC2 = forecastData.list[11].main.temp - 273.16;
      let tempF2 = (tempC2 * 9) / 5 + 32;
      $("#temp2").text("Temp: " + tempF2.toFixed(1) + " F");
      $("#hum2").text("Humidity: " + forecastData.list[11].main.humidity + "%");
      icon2 = document.getElementById("img2");
      icon2.src =
        "https://openweathermap.org/img/wn/" +
        forecastData.list[11].weather[0].icon +
        "@2x.png";

      $("#date3").text(forecastData.list[19].dt_txt);
      let tempC3 = forecastData.list[19].main.temp - 273.16;
      let tempF3 = (tempC3 * 9) / 5 + 32;
      $("#temp3").text("Temp: " + tempF3.toFixed(1) + " F");
      $("#hum3").text("Humidity: " + forecastData.list[19].main.humidity + "%");
      icon3 = document.getElementById("img3");
      icon3.src =
        "https://openweathermap.org/img/wn/" +
        forecastData.list[19].weather[0].icon +
        "@2x.png";

      $("#date4").text(forecastData.list[27].dt_txt);
      let tempC4 = forecastData.list[27].main.temp - 273.16;
      let tempF4 = (tempC4 * 9) / 5 + 32;
      $("#temp4").text("Temp: " + tempF4.toFixed(1) + " F");
      $("#hum4").text("Humidity: " + forecastData.list[27].main.humidity + "%");
      icon4 = document.getElementById("img4");
      icon4.src =
        "https://openweathermap.org/img/wn/" +
        forecastData.list[27].weather[0].icon +
        "@2x.png";

      $("#date5").text(forecastData.list[35].dt_txt);
      let tempC5 = forecastData.list[11].main.temp - 273.16;
      let tempF5 = (tempC5 * 9) / 5 + 32;
      $("#temp5").text("Temp: " + tempF5.toFixed(1) + " F");
      $("#hum5").text("Humidity: " + forecastData.list[35].main.humidity + "%");
      icon5 = document.getElementById("img5");
      icon5.src =
        "https://openweathermap.org/img/wn/" +
        forecastData.list[35].weather[0].icon +
        "@2x.png";
    });
}
