import { fetchWeather } from "./api";
import "./index.css";
import { changeWeatherIcon } from "./scripts/date";
import { closeByClick, closeModal, openModal } from "./scripts/modal";
import { transferDayOfWeek, transferMonth } from "./scripts/time";
import { createTodo, deleteElement } from "./scripts/todo";

// DOM
const mainDate = document.querySelector(".main__date");
const dateValue = mainDate.querySelector(".main__date-date");
const timeValue = mainDate.querySelector(".main__date-time");

const buttonTasks = document.querySelector(".button-tasks");
const iconWeather = document.querySelector(".icon_weather");
const temperatureValue = document.querySelector(".nav__element-temperature");
const city = document.querySelector(".city");

const todosList = document.querySelector('.todos__list');
const popupTodos = document.querySelector('.popup_type_todo');
const formAddTodo = document.forms['new-todo'];
const newTodoName = formAddTodo.elements['todo-name'];


findLocation();
setDefaultValues();

city.addEventListener("click", () => {
  fetchWeather().then((weatherData) => {
    localStorage.setItem("city", String(weatherData.location.name));
    localStorage.setItem("weather", String(weatherData.current.weather_code));
    localStorage.setItem(
      "temperature",
      String(weatherData.current.temperature)
    );
    const icon = changeWeatherIcon(String(weatherData.current.weather_code));
    iconWeather.append(icon);
    temperatureValue.textContent = `${weatherData.current.temperature} °C`;
    city.textContent = weatherData.location.name;
  });
});

setTimeout(updateDate(), 1000);

buttonTasks.addEventListener('click', () => {
  openModal(popupTodos);
})

popupTodos.addEventListener('click', closeByClick);

formAddTodo.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const newElem = createTodo(newTodoName.value, deleteElement);
  todosList.prepend(newElem, todosList.firstChild);
  todosList.prepend(newElem);
  newTodoName.value = "";
});

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

function updateDate() {
  // current date
  const date = new Date();
  const day = date.getDate();
  const month = transferMonth(date.getMonth());
  const dayOfWeek = transferDayOfWeek(date.getDay());

  dateValue.textContent = `${day} ${month}, ${dayOfWeek}`;
  timeValue.textContent = date.toTimeString().slice(0, 8);
  setTimeout(function () {
    updateDate();
  }, 1000);
}

function setDefaultValues() {
  localStorage.getItem("weather")
  ? iconWeather.append(changeWeatherIcon(localStorage.getItem("weather")))
  : iconWeather.append(changeWeatherIcon("113"));

  localStorage.getItem("city")
    ? (city.textContent = localStorage.getItem("city"))
    : (city.textContent = "Краснодар");

  localStorage.getItem("temperature")
    ? (temperatureValue.textContent = `${localStorage.getItem("temperature")} °C`)
    : (city.textContent = "25 °C");
}