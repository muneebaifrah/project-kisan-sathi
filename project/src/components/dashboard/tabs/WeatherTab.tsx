import React, { useState, useEffect, useCallback } from 'react';
import { Wind, Droplets, Eye, Compass } from 'lucide-react';
import { useOffline } from '../../../contexts/OfflineContext';

// Type definitions
interface CurrentWeather {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  visibility: number;
  uvIndex: number;
  feelsLike: number;
}

interface ForecastItem {
  day: string;
  temp: string;
  condition: string;
  desc: string;
  rain: string;
}

interface WeatherAlert {
  type: string;
  title: string;
  message: string;
  icon: string;
}

interface WeatherData {
  current: CurrentWeather;
  forecast: ForecastItem[];
  alerts: WeatherAlert[];
}

interface WeatherCardProps {
  icon: React.ReactNode;
  title: string;
  value: number;
  unit: string;
  color: string;
}

interface ForecastCardProps {
  forecast: ForecastItem;
}

interface AlertCardProps {
  alert: WeatherAlert;
}

const WeatherTab: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('current');
  const { isOnline, getCachedData, cacheData } = useOffline();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const loadWeatherData = useCallback(() => {
    if (isOnline) {
      // Simulate API call
      const data: WeatherData = {
        current: {
          temperature: 28,
          condition: 'Partly Cloudy',
          humidity: 65,
          windSpeed: 12,
          pressure: 1013,
          visibility: 10,
          uvIndex: 6,
          feelsLike: 32
        },
        forecast: [
          { day: 'Today', temp: '28°C', condition: '🌤️', desc: 'Partly Cloudy', rain: '10%' },
          { day: 'Tomorrow', temp: '30°C', condition: '☀️', desc: 'Sunny', rain: '0%' },
          { day: 'Day 3', temp: '26°C', condition: '🌧️', desc: 'Rainy', rain: '80%' },
          { day: 'Day 4', temp: '29°C', condition: '⛅', desc: 'Cloudy', rain: '20%' },
          { day: 'Day 5', temp: '31°C', condition: '☀️', desc: 'Clear Sky', rain: '5%' }
        ],
        alerts: [
          {
            type: 'warning',
            title: 'High Temperature Alert',
            message: 'Temperature expected to reach 35°C tomorrow. Ensure proper irrigation.',
            icon: '🌡️'
          }
        ]
      };
      setWeatherData(data);
      cacheData('weather', data);
    } else {
      const cached = getCachedData('weather') as WeatherData | null;
      if (cached) {
        setWeatherData(cached);
      }
    }
  }, [isOnline, getCachedData, cacheData]);

  useEffect(() => {
    loadWeatherData();
  }, [loadWeatherData]);

  const WeatherCard: React.FC<WeatherCardProps> = ({ icon, title, value, unit, color }) => (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${color}`}>
            {icon}
          </div>
          <div>
            <p className="text-gray-600 text-sm">{title}</p>
            <p className="text-xl font-bold text-gray-800">
              {value}
              <span className="text-sm font-normal text-gray-600 ml-1">{unit}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const ForecastCard: React.FC<ForecastCardProps> = ({ forecast }) => (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-all cursor-pointer hover:border-green-300">
      <div className="text-center">
        <p className="text-gray-600 text-sm font-medium mb-2">{forecast.day}</p>
        <div className="text-3xl mb-2">{forecast.condition}</div>
        <p className="text-lg font-bold text-gray-800 mb-1">{forecast.temp}</p>
        <p className="text-gray-600 text-xs mb-1">{forecast.desc}</p>
        <p className="text-blue-600 text-xs">Rain: {forecast.rain}</p>
      </div>
    </div>
  );

  const AlertCard: React.FC<AlertCardProps> = ({ alert }) => (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
      <div className="flex items-start space-x-3">
        <span className="text-2xl">{alert.icon}</span>
        <div className="flex-1">
          <h4 className="font-semibold text-amber-800 mb-1">{alert.title}</h4>
          <p className="text-amber-700 text-sm">{alert.message}</p>
        </div>
      </div>
    </div>
  );

  if (!weatherData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center space-x-3">
            <span className="text-4xl">🌤️</span>
            <span>Weather Information</span>
          </h1>
          <p className="text-gray-600 mt-1">Hyderabad, Telangana • Real-time updates</p>
        </div>
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setSelectedTab('current')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedTab === 'current' 
                ? 'bg-white text-green-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Current
          </button>
          <button
            onClick={() => setSelectedTab('forecast')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedTab === 'forecast' 
                ? 'bg-white text-green-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            5-Day Forecast
          </button>
          <button
            onClick={() => setSelectedTab('alerts')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedTab === 'alerts' 
                ? 'bg-white text-green-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Alerts
          </button>
        </div>
      </div>

      {selectedTab === 'current' && (
        <div>
          <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl p-6 text-white mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-1">Current Weather</h2>
                <p className="opacity-90">Hyderabad, Telangana</p>
                <div className="flex items-center space-x-4 mt-4">
                  <span className="text-5xl font-bold">{weatherData.current.temperature}°C</span>
                  <div className="text-6xl">🌤️</div>
                </div>
                <p className="text-xl mt-2 opacity-90">{weatherData.current.condition}</p>
                <p className="text-sm opacity-75 mt-1">
                  Feels like {weatherData.current.feelsLike}°C
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <WeatherCard
              icon={<Droplets className="w-5 h-5 text-blue-600" />}
              title="Humidity"
              value={weatherData.current.humidity}
              unit="%"
              color="bg-blue-100"
            />
            <WeatherCard
              icon={<Wind className="w-5 h-5 text-gray-600" />}
              title="Wind Speed"
              value={weatherData.current.windSpeed}
              unit="km/h"
              color="bg-gray-100"
            />
            <WeatherCard
              icon={<Compass className="w-5 h-5 text-purple-600" />}
              title="Pressure"
              value={weatherData.current.pressure}
              unit="mb"
              color="bg-purple-100"
            />
            <WeatherCard
              icon={<Eye className="w-5 h-5 text-green-600" />}
              title="Visibility"
              value={weatherData.current.visibility}
              unit="km"
              color="bg-green-100"
            />
          </div>
        </div>
      )}

      {selectedTab === 'forecast' && (
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">5-Day Weather Forecast</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {weatherData.forecast.map((forecast: ForecastItem, index: number) => (
              <ForecastCard key={index} forecast={forecast} />
            ))}
          </div>
        </div>
      )}

      {selectedTab === 'alerts' && (
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Weather Alerts</h2>
          <div className="space-y-4">
            {weatherData.alerts.map((alert: WeatherAlert, index: number) => (
              <AlertCard key={index} alert={alert} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherTab;