//Challenge 1 - display the current date and time using JavaScript: Tuesday 16:00

let now = new Date();

function formatDate(date) {
  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let weekday = weekdays[date.getDay()];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "september",
    "October",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];
  let day = date.getDate();
  let hours = date.getHours();
  let mins = date.getMinutes();
  if (mins < 10) {
    mins = `0${mins}`;
  }

  let current = `${weekday} ${month} ${day} | ${hours}:${mins} `;

  let today = document.querySelector("h3");
  today.innerHTML = current;
  return today;
}

console.log(formatDate(now));

//On your project, when a user searches for a city (example: New York),
// it should display the name of the city on the result page and the current temperature of the city.
function showSearchData(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let nowTemp = document.querySelector("#current-temp");
  nowTemp.innerHTML = currentTemp;
  let location = document.querySelector("h1");
  location.innerHTML = response.data.name;
}

function cityName(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  let apiKey = "e453dcffbf8a3bfa3b73ca0ef03b7a30";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}`;

  axios.get(`${apiUrl}&apikey=${apiKey}&units=metric`).then(showSearchData);
}

let city = document.querySelector("#search-location");
city.addEventListener("click", cityName);

///Add a Current Location button. When clicking on it, it uses the Geolocation API to get your
///GPS coordinates and display and the city and current temperature using the OpenWeather API.
function showCurrentData(response) {
  console.log(response.data.name);
  console.log(response.data.main.temp);
  let currentTemp = Math.round(response.data.main.temp);
  let nowTemp = document.querySelector("#current-temp");
  nowTemp.innerHTML = currentTemp;
  let location = document.querySelector("h1");
  location.innerHTML = response.data.name;
}

function showLocation(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  let apiKey = "e453dcffbf8a3bfa3b73ca0ef03b7a30";
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}`;

  axios.get(`${apiUrl}&apikey=${apiKey}&units=metric`).then(showCurrentData);
}

function getCurrentLocation(response) {
  navigator.geolocation.getCurrentPosition(showLocation);
}

let currentButton = document.querySelector("#location-button");

currentButton.addEventListener("click", getCurrentLocation);

// Bonus - Display a fake temperature (i.e 17) in Celsius and add a link to convert it to
// Fahrenheit. When clicking on it, it should convert the temperature to Fahrenheit.
// When clicking on Celsius, it should convert it back to Celsius.

function convertTempC(event) {
  event.preventDefault();
  let degType = document.querySelector("#current-temp");
  degType.innerHTML = -8;
}

let toCelius = document.querySelector("#celsius");
toCelius.addEventListener("click", convertTempC);

function convertTempF(event) {
  event.preventDefault();
  let degType = document.querySelector("#current-temp");
  degType.innerHTML = 17;
}

let toFahrenheit = document.querySelector("#fahrenheit");
toFahrenheit.addEventListener("click", convertTempF);
