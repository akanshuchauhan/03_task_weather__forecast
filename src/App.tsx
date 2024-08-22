import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherSearch from './components/WeatherSearch';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import UnitToggle from './components/UnitToggle';
import './styles/global.css';

const App: React.FC = () => {
  const [city, setCity] = useState<string>('');
  const [weather, setWeather] = useState<any | null>(null);
  const [forecast, setForecast] = useState<any[] | null>(null);
  const [unit, setUnit] = useState<string>('metric');
  const [error, setError] = useState<string | null>(null);

  const apiKey = '6617b99fb55ebb899e1ed58cf68f3218';

  const fetchWeatherData = async () => {
    try {
      const currentWeatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`
      );

      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${apiKey}`
      );

      setWeather({
        temperature: currentWeatherResponse.data.main.temp,
        minTemp: currentWeatherResponse.data.main.temp_min,
        maxTemp: currentWeatherResponse.data.main.temp_max,
        humidity: currentWeatherResponse.data.main.humidity,
        windSpeed: currentWeatherResponse.data.wind.speed,
        windDirection: currentWeatherResponse.data.wind.deg,
        description: currentWeatherResponse.data.weather[0].description,
        icon: currentWeatherResponse.data.weather[0].icon,
      });

      // Process forecast data
      const forecastData = formatForecastData(forecastResponse.data.list);
      setForecast(forecastData.slice(0, 5)); // Limit to 5 days
      setError(null);
    } catch (err) {
      setError('City not found. Please enter a valid city name.');
      setWeather(null);
      setForecast(null);
    }
  };

  useEffect(() => {
    if (city) {
      fetchWeatherData();
    }
  }, [city, unit]);

  const formatForecastData = (data: any[]) => {
    const groupedData: any = data.reduce((acc: any, item: any) => {
      const date = item.dt_txt.split(' ')[0];
      if (!acc[date]) {
        acc[date] = { temperatures: [], description: item.weather[0].description, icon: item.weather[0].icon };
      }
      acc[date].temperatures.push(item.main.temp);
      return acc;
    }, {});

    return Object.keys(groupedData).map(date => {
      const { temperatures, description, icon } = groupedData[date];
      const averageTemp = temperatures.reduce((a: number, b: number) => a + b, 0) / temperatures.length;
      return { date, temperature: averageTemp, description, icon };
    });
  };

  const handleUnitToggle = () => {
    setUnit(prevUnit => prevUnit === 'metric' ? 'imperial' : 'metric');
  };

  return (
    <div className="container">
      <h1>Weather Forecast</h1>
      <WeatherSearch onSearch={setCity} />
      <UnitToggle unit={unit === 'metric' ? 'C' : 'F'} onToggle={handleUnitToggle} />

      {error && <p className="error">{error}</p>}

      {weather && <CurrentWeather weather={{ ...weather, icon:
         `https://openweathermap.org/img/w/${weather.icon}.png`
          }} unit={unit === 'metric' ? 'C' : 'F'} />}
      
      {forecast && <Forecast forecast={forecast.map(day => ({
        ...day,
        icon: `https://openweathermap.org/img/w/${day.icon}.png`
      }))} unit={unit === 'metric' ? 'C' : 'F'} />}
    </div>
  );
};

export default App;
