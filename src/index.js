import { fetchWeather } from './api';
import './index.css';

const buttonTasks = document.querySelector('.button-tasks');

const iconWeather = document.querySelector('.icon_weather');
const temperatureValue = document.querySelector('.nav__element-temperature');
const city = document.querySelector('.city');

const mainDate = document.querySelector('.main__date');
const dateValue = mainDate.querySelector('.main__date-date');
const timeValue = mainDate.querySelector('.main__date-time');
const dayOfWeek = mainDate.querySelector('.day-of-week');

function findLocation() {
  if (!navigator.geolocation) {
    alert('Браузер не поддерживает геолокацию. Автоматически выбран г. Краснодар');
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }

  function success(position) {
    const { longitude, latitude }  = position.coords;
    localStorage.setItem("coordsLongitude", String(longitude));
    localStorage.setItem("coordsLatitude", String(latitude));
  }

  function error() {
    alert('Не получается определить вашу геолокацию');
  }
}

findLocation();
console.log(localStorage.getItem("coordsLongitude"));
console.log(localStorage.getItem("coordsLatitude"));

city.addEventListener('click', () => {



  fetchWeather()
    .then((weatherData) => {
      console.log('>>', weatherData.current.weather_code);
      localStorage.setItem("city", String(weatherData.location.name));
      changeWeatherIcon(String(weatherData.current.weather_code));

      // localStorage.setItem("weather", String(weatherData.current.weather_code));
      localStorage.setItem("temperature", String(weatherData.current.temperature));
    })

})

console.log('>', localStorage.getItem("city"));
console.log('>', localStorage.getItem("weather"));
console.log('>', localStorage.getItem("temperature"));



const changeWeatherIcon = (weather_cod) => {
  let weather;
  if (Number(weather_cod) == 113) {
    console.log('Sunny');
    weather = 'sunny';
  }
  else if (Number(weather_cod) <= 230 && Number(weather_cod) >= 185) {
    console.log('Snowy');
    weather = 'snowy';
  }
  else if (Number(weather_cod) >= 263) {
    console.log('Rainy');
    weather = 'rainy';
  }
  else{
    console.log('Cloudy');
    weather = 'cloudy';
  }
  iconWeather.setAttribute('style', `background-image: url(/momentum/images/${weather}.svg);`)
}


changeWeatherIcon("185");






