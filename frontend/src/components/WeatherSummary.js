// src/components/WeatherSummary.js
import React from 'react';

const WeatherSummary = ({ data }) => {
  // Safeguard to ensure data is available and has the expected structure
  if (!data || !data.temperature || !data.feelsLike || !data.mainCondition) {
    return <p>No weather data available.</p>;
  }

  return (
    <div>
      <h2>Weather Data for {data.city}</h2>
      <p><strong>Temperature:</strong> {data.temperature}°C</p>
      <p><strong>Feels Like:</strong> {data.feelsLike}°C</p>
      <p><strong>Main Condition:</strong> {data.mainCondition}</p>
    </div>
  );
};

export default WeatherSummary;
