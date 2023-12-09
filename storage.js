import { favs } from "./main.js";

export const storage = (array) => {
  localStorage.setItem(
    "favCities",
    array.map((item) => {
      return item.name;
    })
  );
};

export const storageToArray = () => {
  if (localStorage.getItem("favCities") === "") {
    return;
  }
  const newArr = localStorage.getItem("favCities").split(",");
  newArr.map((item) => {
    favs.push({ name: item });
  });
};

export const currentCity = (city) => {
  localStorage.setItem("currentCity", city);
};

export const getCurrentCity = () => {
  return localStorage.getItem("currentCity");
};
