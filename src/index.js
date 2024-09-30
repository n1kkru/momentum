import { fetchWeather } from "./api";
import "./index.css";

const buttonTasks = document.querySelector(".button-tasks");

const iconWeather = document.querySelector(".icon_weather");
const temperatureValue = document.querySelector(".nav__element-temperature");
const city = document.querySelector(".city");

const mainDate = document.querySelector(".main__date");
const dateValue = mainDate.querySelector(".main__date-date");
const timeValue = mainDate.querySelector(".main__date-time");
const dayOfWeek = mainDate.querySelector(".day-of-week");

function findLocation() {
  if (!navigator.geolocation) {
    alert(
      "Браузер не поддерживает геолокацию. Автоматически выбран г. Краснодар"
    );
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }

  function success(position) {
    const { longitude, latitude } = position.coords;
    localStorage.setItem("coordsLongitude", String(longitude));
    localStorage.setItem("coordsLatitude", String(latitude));
  }

  function error() {
    alert("Не получается определить вашу геолокацию");
  }
}

findLocation();

localStorage.getItem("weather")
  ? changeWeatherIcon(localStorage.getItem("weather"))
  : changeWeatherIcon("160");

city.addEventListener("click", () => {
  fetchWeather().then((weatherData) => {
    localStorage.setItem("city", String(weatherData.location.name));
    localStorage.setItem("weather", String(weatherData.current.weather_code));
    localStorage.setItem(
      "temperature",
      String(weatherData.current.temperature)
    );
    changeWeatherIcon(String(weatherData.current.weather_code));
    temperatureValue.textContent = `${weatherData.current.temperature} °C`;
    city.textContent = weatherData.location.name;
  });
});

function changeWeatherIcon(weather_cod) {
  let weather;
  if (Number(weather_cod) == 113) {
    weather = "sunny";
  } else if (Number(weather_cod) <= 230 && Number(weather_cod) >= 185) {
    weather = "snowy";
  } else if (Number(weather_cod) >= 263) {
    weather = "rainy";
  } else {
    weather = "cloudy";
  }
  const weatherTemplate = document.querySelector(`#${weather}`).content;
  iconWeather.append(weatherTemplate);
}


function updateDate() {
  const date = new Date();
  
  dateValue.textContent = date.getFullYear();
}

setTimeout(updateDate, 1000);