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

function transferMonth(value) {
  const monthList = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];
  return monthList[value]
}

function transferDayOfWeek(value) {
  const daysList = [
    "воскресенье",
    "понедельник",
    "вторник",
    "среда",
    "четверг",
    "пятница",
    "суббота"
  ];
  return daysList[value]
  
}

function updateDate() {
  const date = new Date();
  const day = date.getDate();
  const month = transferMonth(date.getMonth());
  const dayOfWeek = transferDayOfWeek(date.getDay());

  dateValue.textContent = `${day} ${month}, ${dayOfWeek}`;
  timeValue.textContent = date.toTimeString().slice(0,8);
  setTimeout(function(){updateDate()}, 1000);
}

setTimeout(updateDate(), 1000);

