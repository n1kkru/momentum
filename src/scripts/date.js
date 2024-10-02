export function changeWeatherIcon(weather_cod) {
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
  return document.querySelector(`#${weather}`).content;
}
