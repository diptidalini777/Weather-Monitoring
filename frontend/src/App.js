// src/App.js
import React, { useState, useEffect } from 'react';
import WeatherSummary from './components/WeatherSummary';
import { fetchWeather } from './api';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');
  const [intervalId, setIntervalId] = useState(null);

  const metroCities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];

  const handleFetchWeather = async (city) => {
    try {
      setError(''); 
      const data = await fetchWeather(city);
      console.log("Weather data fetched:", { data });
      setWeatherData((prevData) => ({
        ...prevData,
        [city]: data,
      }));
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError('City not found. Please try again.');
    }
  };

  // Fetch weather data for metro cities at a configurable interval
  useEffect(() => {
    const fetchWeatherForCities = () => {
      metroCities.forEach((city) => handleFetchWeather(city));
    };

    fetchWeatherForCities();

    // Set an interval to fetch weather data every 5 minutes (300000 ms)
    const id = setInterval(fetchWeatherForCities, 300000);
    setIntervalId(id);

 
    return () => clearInterval(id);
  }, []); 

  return (
    <div>
      <h1>Weather Monitoring System</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={() => handleFetchWeather(city)}>Get Weather</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {weatherData && Object.entries(weatherData).map(([cityName, data]) => (
        <WeatherSummary key={cityName} data={data} />
      ))}
    </div>
  );
};

export default App;
