const serverUrl = "https://api.openweathermap.org/data/2.5/weather";
const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast";
const apiKey = "ef115df48d80a2423e44afb52adf59da";

export const getWeather = (cityName) => {
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

export const getForecast = (cityName) => {
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
