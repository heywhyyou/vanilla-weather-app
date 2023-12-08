const serverUrl = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = "ef115df48d80a2423e44afb52adf59da";

const input = document.querySelector(".search__input");
const button = document.querySelector(".search__button");
const degrees = document.querySelector(".degrees");
const city = document.querySelector(".header__city");
const weatherIcon = document.querySelector(".weather__icon");
const form = document.querySelector(".search");
const favs = new Array();
const heart = document.querySelector(".header__button");
const favList = document.querySelector(".fav__list");

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
};

const favHandler = (e) => {
  getWeather(e.target.textContent);
};

form.addEventListener("submit", submitHandler);
heart.addEventListener("click", addToFavs);
