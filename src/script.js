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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 4) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-3">
      <div class="card" style="background-color:#d3ffff">
        <div class="card-body">
          <ul>
            <div class="forecast-date" id="weekday">
            ${formatDay(forecastDay.dt)}
            </div>
            
            <span class="weather-forecast-image"> ${getIcon(
              forecastDay.weather[0].icon
            )}</span>
            <div class="weather-forecast-temperatures">
              <span class="weather-forecast-temp-max">${Math.round(
                forecastDay.temp.max
              )}º</span> |
              <span class="weather-forecast-temp-min">${Math.round(
                forecastDay.temp.min
              )}º</span>
            </div>
          </ul>
        </div>
      </div>
    </div>
  
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "e453dcffbf8a3bfa3b73ca0ef03b7a30";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  console.log(response);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let feelsElement = document.querySelector("#feelsLike");
  let dateElement = document.querySelector("#current-date");
  let iconElement = document.querySelector("#icon");
  let highElement = document.querySelector("#daily-high");
  let lowElement = document.querySelector("#daily-low");

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  feelsElement.innerHTML = Math.round(response.data.main.feels_like);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.innerHTML = getIcon(response.data.weather[0].icon);
  highElement.innerHTML = Math.round(response.data.main.temp_max);
  lowElement.innerHTML = Math.round(response.data.main.temp_min);

  let location = document.querySelector("h1");
  location.innerHTML = response.data.name;

  getForecast(response.data.coord);
}

function getIcon(icon) {
  let newIconElement = "";
  if (icon === "01d") {
    newIconElement = `<i class="fas fa-sun"></i>`;
  } else if (icon === "01n") {
    newIconElement = `<i class="fas fa-moon"></i>`;
  } else if (icon === "02d" || icon === "03d") {
    newIconElement = `<i class="fas fa-cloud-sun"></i>`;
  } else if (icon === "02n" || icon === "03n") {
    newIconElement = `<i class="fas fa-cloud-moon"></i>`;
  } else if (icon === "04d" || icon === "04n") {
    newIconElement = `<i class="fas fa-cloud"></i>`;
  } else if (icon === "10d") {
    newIconElement = `<i class="fas fa-cloud-sun-rain"></i>`;
  } else if (icon === "10n") {
    newIconElement = `<i class="fas fa-cloud-moon-rain"></i>`;
  } else if (icon === "09d" || icon === "09n") {
    newIconElement = `<i class="fas fa-cloud-rain"></i>`;
  } else if (icon === "11d" || icon === "11n") {
    newIconElement = `<i class="fas fas fa-bolt"></i>`;
  } else if (icon === "13d" || icon === "13n") {
    newIconElement = `<i class="far fa-snowflake"></i>`;
  } else if (icon === "50d" || icon === "50n") {
    newIconElement = `<i class="fas fa-smog"></i>`;
  }
  return newIconElement;
}

function search(city) {
  let apiKey = "e453dcffbf8a3bfa3b73ca0ef03b7a30";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&apikey=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function showLocation(position) {
  let apiKey = "e453dcffbf8a3bfa3b73ca0ef03b7a30";
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&apikey=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

let city = document.querySelector("#search-location");
city.addEventListener("click", handleSubmit);

let currentButton = document.querySelector("#location-button");
currentButton.addEventListener("click", getCurrentLocation);

search("Fort Frances");
