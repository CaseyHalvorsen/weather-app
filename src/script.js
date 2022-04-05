function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[date.getMonth()];

  let day = date.getDate();

  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  let weekday = days[date.getDay()];
  return `${weekday} ${month} ${day}, ${hours}:${minutes}`;
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let feelsElement = document.querySelector("#feelsLike");
  let dateElement = document.querySelector("#current-date");
  let iconElement = document.querySelector("#icon");

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  feelsElement.innerHTML = Math.round(response.data.main.feels_like);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.innerHTML = getIcon(response.data.weather[0].icon);

  //  let currentTemp = Math.round(response.data.main.temp);
  //  let nowTemp = document.querySelector("#current-temp");
  //  nowTemp.innerHTML = currentTemp;
  let location = document.querySelector("h1");
  location.innerHTML = response.data.name;

  console.log(response.data);
}

function getIcon(icon) {
  let newIconElement = "";
  if (icon === "02d" || icon === "03d") {
    newIconElement = `<i class="fas fa-solid fa-cloud-sun"></i>`;
  } else if (icon === "02n" || icon === "03n") {
    newIconElement = `<i class="fas fa-solid fa-cloud-moon"></i>`;
  } else if (icon === "04d" || icon === "04n") {
    newIconElement = `<i class="fas fa-solid fa-cloud"></i>`;
  } else if (icon === "01d") {
    newIconElement = `<i class="fas fa-solid fa-sun"></i>`;
  } else if (icon === "01n") {
    newIconElement = `<i class="fas fa-solid fa-moon"></i>`;
  } else if (icon === "10d") {
    newIconElement = `<i class="fas fa-solid fa-cloud-sun-rain"></i>`;
  } else if (icon === "10n") {
    newIconElement = `<i class="fas fa-solid fa-cloud-moon-rain"></i>`;
  } else if (icon === "09d" || icon === "09n") {
    newIconElement = `<i class="fas fa-solid fa-cloud-showers-heavy"></i>`;
  } else if (icon === "11d" || icon === "11n") {
    newIconElement = `<i class="fas fas fa-bolt"></i>`;
  } else if (icon === "13d" || icon === "13n") {
    newIconElement = `<i class="fas fa-solid fa-snowflake"></i>`;
  } else if (icon === "50d" || icon === "50n") {
    newIconElement = `<i class="fas fa-solid fa-smog"></i>`;
  }
  return newIconElement;
}

function cityName(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  let apiKey = "e453dcffbf8a3bfa3b73ca0ef03b7a30";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}`;

  axios.get(`${apiUrl}&apikey=${apiKey}&units=metric`).then(displayTemperature);
}

let city = document.querySelector("#search-location");
city.addEventListener("click", cityName);

function showLocation(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  let apiKey = "e453dcffbf8a3bfa3b73ca0ef03b7a30";
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}`;

  axios.get(`${apiUrl}&apikey=${apiKey}&units=metric`).then(displayTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

let currentButton = document.querySelector("#location-button");

currentButton.addEventListener("click", getCurrentLocation);

search("Kelowna");
