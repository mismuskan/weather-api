document.addEventListener("DOMContentLoaded", () => {
    const fetchButton = document.getElementById("fetchButton");
    const locationDiv = document.getElementById("location");
    const mapDiv = document.getElementById("map");
    const weatherDiv = document.getElementById("weather");
    const headingWeatherApi = document.getElementById("heading-weather-api");
    const heroSection = document.getElementById("hero-section");
    const locationhead = document.getElementById("location-head");
  
    fetchButton.addEventListener("click", () => {
      getLocation();
      heroSection.style.display = "none";
    });
  
    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
      } else {
        locationDiv.textContent = "Geolocation is not supported by this browser.";
      }
    }
  
    function showPosition(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      locationDiv.innerHTML = `
      <h2>Welcome to the weather app<h2>
      <p class="location-p" >Here is your current location</p>
      <p class="location-lati">Latitude: ${latitude}, Longitude: ${longitude}</p>
      `
      showMap(latitude, longitude);
      fetchWeather(latitude, longitude);
    }
  
    function showError(error) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          locationDiv.textContent = "User denied the request for Geolocation.";
          break;
        case error.POSITION_UNAVAILABLE:
          locationDiv.textContent = "Location information is unavailable.";
          break;
        case error.TIMEOUT:
          locationDiv.textContent = "The request to get user location timed out.";
          break;
        case error.UNKNOWN_ERROR:
          locationDiv.textContent = "An unknown error occurred.";
          break;
      }
    }
  
    function showMap(latitude, longitude) {
      // Use latitude and longitude to show the location on Google Maps (refer to the provided resources)
      // You can use the Google Maps Embed API or JavaScript API to display the map
      // For simplicity, you can use an iframe for the embedded map as shown in the provided tutorial
      mapDiv.innerHTML = `<iframe src="https://maps.google.com/maps?q=35.856737, 10.606619&z=15&output=embed" width="100%" height="250px" frameborder="0" style="border:0"></iframe>`;
    }
  
    function fetchWeather(latitude, longitude) {
      const apiKey = "bcbc416f594d0a7c6feec5ba33bfeb36";
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=18.5204303&lon=73.8567437&units=metric`;
  
      async function checkWeather() {
        const response = await fetch(apiUrl + `&appid=${apiKey}`);
        var data = await response.json();
        console.log(data);6 
  
        weatherDiv.innerHTML = `
        <h2>Your Weather Data</h2>
         <div class="weather-class"> <p class="weather-item">Location: ${data.name}</p>
         <p class="weather-item">Wind Speed: ${data.wind.speed} km/h</p>
         <p class="weather-item">Humidity: ${data.main.humidity}%</p>
         <p class="weather-item">Timezone: ${data.timezone}</p>
         <p class="weather-item">Pressure: ${data.main.pressure} atm</p>
         <p class="weather-item">Feels Like: ${data.main.feels_like}°C</p>
         <p class="weather-item">wind speed: ${data.wind.speed}</p></div>
        `;
      }
      checkWeather();
    }
  });