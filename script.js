// 🔁 Wait until the DOM is fully loaded before running any JavaScript
document.addEventListener('DOMContentLoaded', () => {
  // 📦 DOM Elements
  const form = document.querySelector('form');                     // Selects the weather form element
  const cityInput = document.querySelector('input[type="text"]'); // Selects the input field for city name
  const weatherInfo = document.querySelector('.weather-info');    // Selects the container to show weather results
  const errorMessage = document.querySelector('.error-message');  // Selects the container to display error messages

  // 🔑 Your OpenWeatherMap API key (replace with your own API key if needed)
  const apiKey = 'api key';

  // 🧠 Handle form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevents default form action (page reload)

    // 🌆 Get and clean the user's input
    const city = cityInput.value.trim();

    // ♻️ Clear any previous weather info or error messages
    weatherInfo.innerHTML = '';
    errorMessage.textContent = '';

    // ⚠️ Check if input is empty
    if (!city) {
      errorMessage.textContent = 'Please enter a city name.'; // Show warning
      return; // Stop further execution
    }

    try {
      // 🌍 Fetch weather data from OpenWeatherMap API using async/await
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      // ❌ If city not found or other error, throw an error to be caught later
      if (!response.ok) {
        throw new Error('City not found');
      }

      // ✅ Convert the API response to JSON
      const data = await response.json();

      // 🧊 Extract relevant weather details from the response
      const temperature = data.main.temp;                         // Current temperature in °C
      const condition = data.weather[0].main;                     // Main weather condition (e.g., "Rain")
      const description = data.weather[0].description;            // More detailed condition (e.g., "light rain")
      const location = `${data.name}, ${data.sys.country}`;       // City and country (e.g., "Delhi, IN")

      // 🖼️ Decide which image to show based on the main weather condition
      const conditionLower = condition.toLowerCase();             // Normalize condition to lowercase
      let imagePath = 'images/default.png';                       // Default fallback image

      // 🔁 Switch-case to update image path for specific weather types
      switch (conditionLower) {
        case 'clear':
          imagePath = 'images/clear.png';
          break;
        case 'clouds':
          imagePath = 'images/clouds.png';
          break;
        case 'rain':
          imagePath = 'images/rain.png';
          break;
        case 'snow':
          imagePath = 'images/snow.png';
          break;
        case 'thunderstorm':
          imagePath = 'images/thunderstorm.png';
          break;
      }

      // 🌤️ Render the fetched weather data to the DOM
      weatherInfo.innerHTML = `
        <h2>${location}</h2>
        <img src="${imagePath}" alt="${description}" />
        <p><strong>Temperature:</strong> ${temperature}°C</p>
        <p><strong>Condition:</strong> ${description}</p>
      `;
    } catch (error) {
      // 🔴 Display an error message in case of failure
      errorMessage.textContent = 'Unable to fetch weather data. Please check the city name.';
      console.error('Error fetching weather:', error); // Log actual error to console for debugging
    }
  });
});
