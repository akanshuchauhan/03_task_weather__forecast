import React from 'react';
import { format } from 'date-fns';

interface ForecastProps {
  forecast: Array<{
    date: string;
    temperature: number;
    description: string;
    icon: string;
  }>;
  unit: string;
}

const Forecast: React.FC<ForecastProps> = ({ forecast, unit }) => {
  return (
    <div>
      <h2>5-Day Forecast</h2>
      <div className="forecast-container">
        {forecast.map((day, index) => (
          <div key={index} className="forecast-card">
            <p>{format(new Date(day.date), 'dd/MM/yyyy')}</p>
            <img src={day.icon} alt="weather icon" />
            <p>{day.description}</p>
            <p>{day.temperature.toFixed(1)}° {unit}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
