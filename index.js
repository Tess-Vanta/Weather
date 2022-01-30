var inputBox = document.querySelector(".inputValue");
var place = document.querySelector(".place");
var desc = document.querySelector(".description");
var temp = document.querySelector(".temperature");
var bg = document.querySelector(".right");
var hl = document.querySelector(".high-low");
var glass = document.querySelector(".glass");
var time = document.querySelector(".time");
var day = document.querySelector(".day");
var date = document.querySelector(".date");
var defa = document.querySelector(".default");
var feels = document.querySelector(".feels");
var humidity = document.querySelector(".humidity");
var visibility = document.querySelector(".visibility");
var wind = document.querySelector(".wind");
var months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
var days = [
  "Sunday",
  "Monday",
  "Tueday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const API_key = "39ae6b812f12824bf23fca1724f583b7";

inputBox.addEventListener("keypress", (evt) => {
  if (evt.keyCode == 13) {
    var input = inputBox.value;
    const response = fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&APPID=${API_key}`
    )
      .then((weather) => {
        return weather.json();
      })
      .then(display);
    inputBox.value = "";
  }
});
var img = new Image(1, 1);
img.classList.add("icon");

function display(weather) {
  console.log(weather);

  if (weather.cod == "404") {
    alert("Not a valid input");
    brea;
  } else if (weather.cod == "400") {
    alert("Please enter a city");
  } else {
    place.innerText =
      weather.sys.country != "undefined"
        ? weather.name + ", " + weather.sys.country
        : weather.name;
    desc.innerText = weather.weather[0].description;
    temp.innerText = Math.floor(weather.main.temp) + "°C";
    hl.innerText =
      "High: " +
      Math.floor(weather.main.temp_max) +
      "° Low: " +
      Math.floor(weather.main.temp_min) +
      "°";
    var main = weather.weather[0].main;
    glass.style.opacity = 1;
    bg.style.backgroundImage = `url(./images/${main}.jpg)`;
    glass.prepend(img);
    var icono = weather.weather[0].icon;
    img.src = `http://openweathermap.org/img/wn/${icono}@2x.png`;
    feels.innerHTML = Math.floor(weather.main.feels_like) + "°";
    humidity.innerHTML = Math.floor(weather.main.humidity) + "%";
    visibility.innerHTML = Math.floor(weather.visibility / 1000) + "km";
    wind.innerHTML = Math.floor(weather.wind.speed) + "m/s";
    if (
      weather.weather[0].main == "Ash" ||
      weather.weather[0].main == "Drizzle" ||
      weather.weather[0].main == "Rain" ||
      weather.weather[0].main == "Thunderstorm"
    ) {
      glass.style.color = "white";
    } else {
      glass.style.color = "rgb(61, 61, 61)";
    }
    var b = new Date();
    var utc = b.getTime() + b.getTimezoneOffset() * 60000;
    var nd = new Date(utc + (3600000 * weather.timezone) / 3600);
    var hr = nd.getHours();
    var min = nd.getMinutes();
    var suf = hr < 12 ? "<span>AM</span>" : "<span>PM</span>";
    hr = hr == 0 ? 12 : hr;
    hr = hr > 12 ? hr - 12 : hr;
    hr = checkTime(hr);
    min = checkTime(min);
    time.innerHTML = hr + ":" + min + " " + suf;
    defa.style.display = "none";
    var curWeekDay = days[nd.getDay()];
    var curDay = nd.getDate();
    var curMonth = months[nd.getMonth()];
    var curYear = nd.getFullYear();
    day.innerHTML = curWeekDay;
    date.innerHTML = curDay + " " + curMonth + " " + curYear;
  }
}

var today = new Date();
var hr = today.getHours();
var min = today.getMinutes();
var suf = hr < 12 ? "<span>AM</span>" : "<span>PM</span>";
hr = hr == 0 ? 12 : hr;
hr = hr > 12 ? hr - 12 : hr;
hr = checkTime(hr);
min = checkTime(min);
time.innerHTML = hr + ":" + min + " " + suf;

var curWeekDay = days[today.getDay()];
var curDay = today.getDate();
var curMonth = months[today.getMonth()];
var curYear = today.getFullYear();

day.innerHTML = curWeekDay;
date.innerHTML = curDay + " " + curMonth + " " + curYear;

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
