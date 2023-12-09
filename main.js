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

import { getForecast, getWeather } from "./api.js";

export const favs = new Array();

export const capitalize = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
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
