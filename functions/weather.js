// weather.js

const fetch = require('node-fetch');

exports.handler = async (event) => {
  const { location } = JSON.parse(event.body);
  const apiKey = process.env.API_KEY;
  const apiUrl = 'https://api.weatherapi.com/v1/current.json';

  try {
    const response = await fetch(`${apiUrl}?key=${apiKey}&q=${location}`);
    const data = await response.json();

    if (response.ok) {
      const temperature = data.current.temp_c;
      const condition = data.current.condition.text;

      return {
        statusCode: 200,
        body: JSON.stringify({
          temperature,
          condition,
        }),
      };
    } else {
      throw new Error('Unable to fetch the weather data');
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Error fetching weather data',
      }),
    };
  }
};
