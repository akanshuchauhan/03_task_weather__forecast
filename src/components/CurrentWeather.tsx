import React from 'react';

// Define the type for the props expected by the component
interface CurrentWeatherProps {
  weather: {
    temperature: number;
    minTemp: number;
    maxTemp: number;
    humidity: number;
    windSpeed: number;
    windDirection: number;
    description: string;
    icon: string; // URL to the weather icon
  };
  unit: 'C' | 'F';
}

// Define the CurrentWeather component
const CurrentWeather: React.FC<CurrentWeatherProps> = ({ weather, unit }) => {
  // Function to render the weather icon based on the icon URL
  const renderWeatherIcon = (iconUrl: string) => {
    return <img src={iconUrl} alt="weather icon" className="weather-icon-style" />;
  };

  // Function to convert temperature based on the selected unit
  const convertTemperature = (temp: number) => {
    return unit === 'C' ? temp : (temp * 9/5) + 32;
  };

  return (
    <div className="weather-card">
      <h2>Current Weather</h2>
      <div className="weather-icon">
        {renderWeatherIcon(weather.icon)}
      </div>
      <div className="weather-description">
        <p>{weather.description}</p>
      </div>
      <div className="temperature-info">
        <p>Temperature: {convertTemperature(weather.temperature).toFixed(1)}°{unit}</p>
        <p>Min Temperature: {convertTemperature(weather.minTemp).toFixed(1)}°{unit}</p>
        <p>Max Temperature: {convertTemperature(weather.maxTemp).toFixed(1)}°{unit}</p>
      </div>
      <div className="humidity-info">
        <p>Humidity: {weather.humidity}%</p>
      </div>
      <div className="wind-info">
        <p>Wind Speed: {weather.windSpeed} m/s</p>
        <p>Wind Direction: {weather.windDirection}°</p>
      </div>
    </div>
  );
};

export default CurrentWeather;
