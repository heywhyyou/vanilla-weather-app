import {
  input,
  button,
  degrees,
  city,
  weatherIcon,
  form,
  heart,
  favList,
  feelsLike,
  sunrise,
  sunset,
  temp12,
  temp15,
  temp18,
  feelsLike12,
  feelsLike15,
  feelsLike18,
  weatherIcon12,
  weatherIcon15,
  weatherIcon18,
} from "./dom-element.js";

import {
  currentCity,
  getCurrentCity,
  storage,
  storageToArray,
} from "./storage.js";

const serverUrl = "https://api.openweathermap.org/data/2.5/weather";
const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast";
const apiKey = "ef115df48d80a2423e44afb52adf59da";

export const favs = new Array();

const capitalize = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

const getWeather = (cityName) => {
  let url = `${serverUrl}?q=${capitalize(
    cityName
  )}&appid=${apiKey}&units=metric`;
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      degrees.innerHTML = `${Math.round(data.main.temp)}&deg;`;
      city.textContent = capitalize(cityName);
      weatherIcon.innerHTML = `<image xlink:href='img/svg/${data.weather[0].icon}.svg' width='100%' height='100%' />`;

      input.value = "";

      feelsLike.innerHTML = `Feels like: ${Math.round(
        data.main.feels_like
      )}&deg;`;

      const sunriseInMillis = data.sys.sunrise * 1000;
      const sunsetInMillis = data.sys.sunset * 1000;

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
    })
    .catch((error) => {
      console.error(error);
    });
};

const getForecast = (cityName) => {
  let url = `${forecastUrl}?q=${capitalize(
    cityName
  )}&appid=${apiKey}&units=metric`;
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      temp12.innerHTML = `Temperature: ${Math.round(
        data.list[2].main.temp
      )}&deg;`;
      feelsLike12.innerHTML = `Feels like: ${Math.round(
        data.list[2].main.feels_like
      )}&deg;`;
      weatherIcon12.innerHTML = `<image xlink:href='img/svg/${data.list[2].weather[0].icon}.svg' width='100%' height='100%' />`;

      temp15.innerHTML = `Temperature: ${Math.round(
        data.list[3].main.temp
      )}&deg;`;
      feelsLike15.innerHTML = `Feels like: ${Math.round(
        data.list[3].main.feels_like
      )}&deg;`;
      weatherIcon15.innerHTML = `<image xlink:href='img/svg/${data.list[3].weather[0].icon}.svg' width='100%' height='100%' />`;

      temp18.innerHTML = `Temperature: ${Math.round(
        data.list[4].main.temp
      )}&deg;`;
      feelsLike18.innerHTML = `Feels like: ${Math.round(
        data.list[4].main.feels_like
      )}&deg;`;
      weatherIcon18.innerHTML = `<image xlink:href='img/svg/${data.list[4].weather[0].icon}.svg' width='100%' height='100%' />`;
    })

    .catch((error) => {
      console.error(error);
    });
};

const checkName = (array, searchString) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i].name === searchString) {
      return true;
    }
  }
  return false;
};

const addToFavs = (event) => {
  try {
    if (checkName(favs, city.textContent)) {
      throw new Error("Город уже в избранном");
    }
    favs.push({ name: city.textContent });
    storage(favs);
    render(event);
  } catch (error) {
    alert(error);
  }
};

const deleteFromStorage = (name) => {
  let index = favs.findIndex(function (item) {
    return item.name === name;
  });

  if (index !== -1) {
    favs.splice(index, 1);
  }
};

const removeFav = (event) => {
  deleteFromStorage(event.target.previousElementSibling.textContent);

  event.target.removeEventListener("click", removeFav);
  storage(favs);
  render(event);
};

const render = (event) => {
  let allCities = document.querySelectorAll("li");
  allCities.forEach((task) => {
    task.remove();
  });

  favs.forEach(function (city) {
    let newName = city.name;
    let newFav = document.createElement("li");
    let newP = document.createElement("p");
    let newButton = document.createElement("button");

    newP.textContent = newName;
    newButton.classList.add("lnr");
    newButton.classList.add("lnr-cross");
    newP.classList.add("fav-city");

    newFav.appendChild(newP);
    newFav.appendChild(newButton);

    favList.appendChild(newFav);

    newP.addEventListener("click", favHandler);
    newButton.addEventListener("click", removeFav);
  });
};

const submitHandler = (e) => {
  e.preventDefault();
  getWeather(input.value);
  getForecast(input.value);
  currentCity(input.value);
};

const favHandler = (e) => {
  getWeather(e.target.textContent);
  getForecast(e.target.textContent);
  currentCity(e.target.textContent);
};

form.addEventListener("submit", submitHandler);
heart.addEventListener("click", addToFavs);

storageToArray();
render();
getWeather(getCurrentCity());
getForecast(getCurrentCity());
