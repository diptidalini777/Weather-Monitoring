// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cron = require('node-cron'); // Import node-cron for scheduling tasks
const axios = require('axios');    // For API calls
const weatherRoutes = require('./routes/weatherRoutes');
const { PrismaClient } = require('@prisma/client');

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.use('/api/weather', weatherRoutes(prisma));

const PORT = process.env.PORT || 5000;

// Function to fetch and store weather data for a given city
const fetchAndStoreWeatherData = async (city) => {
  const apiKey = process.env.OPENWEATHER_API_KEY;

  try {
    
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);    
    const { main, weather } = response.data;

    await prisma.weather.create({
      data: {
        city,
        temperature: main.temp,
        feelsLike: main.feels_like,
        mainCondition: weather[0].main,
      },
    });

    console.log(`Weather data for ${city} has been updated.`);
  } catch (error) {
    console.error(`Error fetching weather data for ${city}:`, error);
  }
};

const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];

// Schedule the job to run every 5 minutes
cron.schedule('*/5 * * * *', () => {
  console.log('Fetching weather data for Indian metros...');
  cities.forEach((city) => {
    fetchAndStoreWeatherData(city); 
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
