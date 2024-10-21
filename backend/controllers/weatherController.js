const axios = require('axios');

const getWeatherData = async (req, res, prisma) => {
  const city = req.params.city;
  const apiKey = process.env.OPENWEATHER_API_KEY;

  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
    const { main, weather } = response.data;

    const temperature = main.temp - 273.15; 
    const feelsLike = main.feels_like - 273.15; 

    const weatherData = await prisma.weather.create({
      data: {
        city,
        temperature,
        feelsLike,
        mainCondition: weather[0].main,
      },
    });

    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching weather data' });
  }
};

module.exports = { getWeatherData };
