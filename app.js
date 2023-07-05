const locationInput = document.querySelector("#location-input");
const submitButton = document.querySelector("#submit-btn");
const weatherInfo = document.querySelector("#weather-info");
const loadingDiv = document.querySelector("#loading");
const errorDiv = document.querySelector("#error");

submitButton.addEventListener("click", function() {
  fetchWeatherData(locationInput.value);
});

// Function to fetch weather data from the serverless function
const fetchWeatherData = async (location) => {
  // Show loading state
  loadingDiv.style.display = 'block';
  weatherInfo.style.visibility = 'hidden';
  errorDiv.style.display = 'none';

  try {
    const response = await fetch('/.netlify/functions/weather', {
      method: 'POST',
      body: JSON.stringify({ location }),
    });

    // Hide loading state
    loadingDiv.style.display = 'none';

    if (response.ok) {
      const { temperature, condition } = await response.json();

      // Display the weather information
      weatherInfo.style.visibility = 'visible';
      weatherInfo.innerHTML = `
        <h2>Current Weather in ${location}</h2>
        <p>Temperature: ${temperature}°C</p>
        <p>Condition: ${condition}</p>
      `;
    } else {
      throw new Error('Unable to fetch the weather data');
    }
  } catch (error) {
    errorDiv.style.display = 'block';
    errorDiv.textContent = 'Error fetching weather data: ' + error.message;
    console.log('Error fetching weather data:', error);
  }
};
