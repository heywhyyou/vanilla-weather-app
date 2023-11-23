const serverUrl = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = "f660a2fb1e4bad108d6160b7f58c555f";

const input = document.querySelector(".search__input");
const button = document.querySelector(".search__button");
const degrees = document.querySelector(".degrees");
const city = document.querySelector(".footer__city");

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
      degrees.textContent = `${celsiusTemp}°`;
      city.textContent = cityName;
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
