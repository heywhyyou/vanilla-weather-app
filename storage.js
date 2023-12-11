import { favs } from "./main.js";

export const storage = (set) => {
  localStorage.setItem(
    "favCities",
    Array.from(set).map((item) => {
      return item;
    })
  );
};

export const storageToSet = () => {
  if (localStorage.getItem("favCities") === "") {
    return;
  }
  const newArr = localStorage.getItem("favCities").split(",");
  newArr.map((item) => {
    favs.add(item);
  });
};

export const currentCity = (city) => {
  localStorage.setItem("currentCity", city);
};

export const getCurrentCity = () => {
  return localStorage.getItem("currentCity");
};
