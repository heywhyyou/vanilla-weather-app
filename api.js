import { capitalize } from "./main.js";
import {
  degrees,
  city,
  weatherIcon,
  input,
  feelsLike,
  sunrise,
  sunset,
} from "./dom-element.js";

const serverUrl = "https://api.openweathermap.org/data/2.5/weather";
const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast";
const apiKey = "ef115df48d80a2423e44afb52adf59da";

export const getWeather = async (cityName) => {
  let url = `${serverUrl}?q=${capitalize(
    cityName
  )}&appid=${apiKey}&units=metric`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    degrees.innerHTML = `${Math.round(data.main.temp)}&deg;`;
    city.textContent = capitalize(cityName);
    weatherIcon.innerHTML = `<image xlink:href='img/svg/${data.weather[0].icon}.svg' width='100%' height='100%' />`;

    input.value = "";

    feelsLike.innerHTML = `Feels like: ${Math.round(
      data.main.feels_like ?? 0
    )}&deg;`;
    const myTimeOffset = new Date().getTimezoneOffset() * 60;

    const sunriseInMillis =
      (data.sys.sunrise ?? 0 + data.timezone + myTimeOffset) * 1000;
    const sunsetInMillis =
      (data.sys.sunset ?? 0 + data.timezone + myTimeOffset) * 1000;

    const sunriseDate = new Date(sunriseInMillis);
    const sunsetDate = new Date(sunsetInMillis);

    const sunriseHours = sunriseDate.getHours();
    const sunsetHours = sunsetDate.getHours();
    const sunriseMinutes = sunriseDate.getMinutes();
    const sunsetMinutes = sunsetDate.getMinutes();

    sunrise.innerHTML = `Sunrise: ${sunriseHours
      .toString()
      .padStart(2, "0")}:${sunriseMinutes.toString().padStart(2, "0")}`;

    sunset.innerHTML = `Sunset: ${sunsetHours
      .toString()
      .padStart(2, "0")}:${sunsetMinutes.toString().padStart(2, "0")}`;
  } catch (error) {
    console.error(error);
  }
};

export const getForecast = async (cityName) => {
  let url = `${forecastUrl}?q=${capitalize(
    cityName
  )}&appid=${apiKey}&units=metric&cnt=3`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const detailsParent = document.querySelector(".details-wrapper-main");

    while (detailsParent.firstChild) {
      detailsParent.removeChild(detailsParent.firstChild);
    }

    data.list.forEach((item) => {
      const html = `
          <div class="details-wrapper">
            <div class="temp-hours">
              <p>  ${item.dt_txt.slice(11, 16)} </p>
              <div class="temp-hours__values">
                <p class="temp-hours__value">Temperature: ${Math.round(
                  item.main.temp
                )}&deg;</p>
                <p class="feels-like__value">Feels like: ${Math.round(
                  item.main.feels_like
                )}&deg;</p>
              </div>
            </div>
            <svg class="weather__icon weather__icon-12">
              <image xlink:href='img/svg/${
                item.weather[0].icon
              }.svg' width='100%' height='100%' />
            </svg>
          </div>
        `;

      detailsParent.insertAdjacentHTML("beforeend", html);
    });
  } catch (error) {
    console.error(error);
  }
};
