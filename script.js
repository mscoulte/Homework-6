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

function renderCity() {}

document.getElementById("searchBtn").addEventListener("click", function(event) {
  let cityName = document.getElementById("citySearch").value;
  let queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=" +
    APIKey;

  fetch(queryURL)
    .then(function(result) {
      return result.json();
    })
    .then(function(data) {
      $("#cityName").text(data.name + " " + date);
      let tempC = data.main.temp - 273.15;
      let tempF = (tempC * 9) / 5 + 32;
      $("#temp").text("Temperature: " + tempF + " F");
      $("#humidity").text("Humidity: " + data.main.humidity + " %");
      $("#wind").text("Wind: " + data.wind.speed * 2.23694 + " MpH");

      console.log(data);
    });
});
