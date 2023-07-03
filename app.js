window.addEventListener('load', () => {
    const weatherInfo = document.getElementById('weather-info');
    const locationInput = document.getElementById('location-input');
    const submitBtn = document.getElementById('submit-btn');
  
    // Function to fetch weather data from the API
    const fetchWeatherData = async (location) => {
      const apiKey = process.env.API_KEY;
      const apiUrl = 'https://api.weatherapi.com/v1/current.json';
  
      try {
        const response = await fetch(`${apiUrl}?key=${apiKey}&q=${location}`);
        const data = await response.json();
  
        // Extract relevant weather information from the API response
        const temperature = data.current.temp_c;
        const condition = data.current.condition.text;
  
        // Display the weather information
        weatherInfo.innerHTML = `
          <h2>Current Weather in ${location}</h2>
          <p>Temperature: ${temperature}°C</p>
          <p>Condition: ${condition}</p>
        `;
      } catch (error) {
        console.log('Error fetching weather data:', error);
        weatherInfo.innerHTML = '<h2>Unable to fetch weather data</h2>';
      }
    };
  
    // Handle the button click event
    submitBtn.addEventListener('click', () => {
      const location = locationInput.value.trim();
      if (location !== '') {
        fetchWeatherData(location);
      }
    });
  });
  