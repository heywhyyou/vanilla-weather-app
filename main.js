const serverUrl = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = "ef115df48d80a2423e44afb52adf59da";

const input = document.querySelector(".search__input");
const button = document.querySelector(".search__button");
const degrees = document.querySelector(".degrees");
const city = document.querySelector(".footer__city");
const weatherIcon = document.querySelector(".weather__icon");
const form = document.querySelector(".search");

const getWeather = (cityName) => {
  let url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      degrees.innerHTML = `${Math.round(data.main.temp)}&deg;`;
      city.textContent = cityName;
      weatherIcon.innerHTML = `<image xlink:href='img/svg/${data.weather[0].icon}.svg' width='100%' height='100%' />`;
      input.value = "";
    })
    .catch((error) => {
      console.error(error);
    });
};

const submitHandler = (e) => {
  e.preventDefault();
  getWeather(input.value);
};

form.addEventListener("submit", submitHandler);
