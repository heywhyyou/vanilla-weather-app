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
} from "./dom-element.js";

import {
  currentCity,
  getCurrentCity,
  storage,
  storageToSet,
} from "./storage.js";

import { getForecast, getWeather } from "./api.js";

export const favs = new Set();

export const capitalize = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

const addToFavs = (event) => {
  try {
    favs.add(city.textContent);
    console.log(favs);
    storage(favs);
    render(event);
  } catch (error) {
    alert(error);
  }
};

// const deleteFromStorage = (name) => {
//   favs.forEach((item) => {
//     if (item === name) {
//       favs.delete(name);
//     }
//   });
// };

// Recursion implemented here:
const deleteFromStorage = (name) => {
  if (favs.has(name)) {
    favs.delete(name);
    deleteFromStorage(name);
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
    let newName = city;
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

storageToSet();
render();
getWeather(getCurrentCity());
getForecast(getCurrentCity());
