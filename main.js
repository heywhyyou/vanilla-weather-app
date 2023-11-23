const serverUrl = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = "ef115df48d80a2423e44afb52adf59da";

const input = document.querySelector(".search__input");
const button = document.querySelector(".search__button");
const degrees = document.querySelector(".degrees");
const city = document.querySelector(".footer__city");
const weatherIcon = document.querySelector(".weather__icon");

const convertKelvinToCelsius = (num) => Math.round(num - 273.15);

const getWeather = (cityName) => {
  let url = `${serverUrl}?q=${cityName}&appid=${apiKey}`;
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let kelvinTemp = data.main.temp;
      let celsiusTemp = convertKelvinToCelsius(kelvinTemp);
      degrees.innerHTML = `${celsiusTemp}&deg;`;
      city.textContent = cityName;
      weatherIcon.innerHTML = `<image xlink:href='img/svg/${data.weather[0].icon}.svg' width='100%' height='100%' />`;
    })
    .catch((error) => {
      console.error(error);
    });
};

const buttonClickHandler = () => {
  getWeather(input.value);
};

const enterPressHandler = (e) => {
  if (e.key === "Enter") {
    getWeather(input.value);
  }
};

button.addEventListener("click", buttonClickHandler);
input.addEventListener("keydown", enterPressHandler);
