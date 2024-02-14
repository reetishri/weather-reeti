const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const currentLocationBtn = document.getElementById("current-location-btn");
const weatherDetails = document.getElementById("weather-details");

const API_KEY = "YOUR_API_KEY_HERE";

function displayWeatherDetails(weatherData) {
    const { name, main, wind, weather } = weatherData;
    const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}.png`;

    weatherDetails.innerHTML = `
        <h2 id="city-name">${name}</h2>
        <img id="weather-icon" src="${iconUrl}" alt="Weather Icon">
        <p id="temperature">Temperature: ${main.temp} K</p>
        <p id="wind-speed">Wind Speed: ${wind.speed} m/s</p>
        <p id="humidity">Humidity: ${main.humidity}%</p>
    `;
}

function getWeatherData(cityName) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;

    fetch(url)
        .then((response) => response.json())
        .then((data) => displayWeatherDetails(data))
        .catch((error) => console.error(error));
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

            fetch(url)
                .then((response) => response.json())
                .then((data) => displayWeatherDetails(data))
                .catch((error) => console.error(error));
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

searchBtn.addEventListener("click", () => {
    const cityName = cityInput.value.trim();
    if (cityName) {
        getWeatherData(cityName);
    } else {
        alert("Please enter a city name.");
    }
});

currentLocationBtn.addEventListener("click", getLocation);