import React, { useState, useEffect } from 'react';
import { 
  Sun, 
  CloudSun, 
  CloudFog, 
  CloudDrizzle, 
  CloudRain, 
  Snowflake, 
  CloudLightning, 
  Wind, 
  Droplets, 
  Thermometer, 
  RefreshCw 
} from 'lucide-react';
import { fetchCurrentWeather } from '../services/api.js';
import { getWeatherCondition } from '../utils/helpers.js';

const WeatherCard = ({ lat, lng, destinationName = "Destination" }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadWeather = async () => {
    if (lat === undefined || lng === undefined) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCurrentWeather(lat, lng);
      if (data) {
        setWeather(data);
      } else {
        setError("Live weather unavailable for this coordinates.");
      }
    } catch (e) {
      setError("Failed to fetch from Open-Meteo API.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWeather();
  }, [lat, lng]);

  const renderWeatherIcon = (code) => {
    const info = getWeatherCondition(code);
    switch (info.icon) {
      case 'Sun': return <Sun className="w-12 h-12 text-amber-500 animate-pulse" />;
      case 'CloudSun': return <CloudSun className="w-12 h-12 text-sky-500 animate-bounce" />;
      case 'CloudFog': return <CloudFog className="w-12 h-12 text-slate-400" />;
      case 'CloudDrizzle': return <CloudDrizzle className="w-12 h-12 text-blue-400 animate-pulse" />;
      case 'CloudRain': return <CloudRain className="w-12 h-12 text-blue-600 animate-bounce" />;
      case 'Snowflake': return <Snowflake className="w-12 h-12 text-indigo-400 animate-spin-slow" />;
      case 'CloudLightning': return <CloudLightning className="w-12 h-12 text-purple-600 animate-pulse" />;
      default: return <Sun className="w-12 h-12 text-amber-500" />;
    }
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 shadow-xl border border-slate-700/80 flex items-center justify-center h-48 animate-pulse">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 text-teal-400 animate-spin mx-auto mb-2" />
          <p className="text-xs text-slate-300 font-medium">Fetching live weather from Open-Meteo API...</p>
        </div>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="bg-slate-900 text-slate-300 rounded-2xl p-6 border border-slate-800 shadow-lg text-center">
        <CloudSun className="w-10 h-10 text-slate-500 mx-auto mb-2" />
        <p className="text-sm font-semibold text-white">Weather information unavailable</p>
        <p className="text-xs text-slate-400 mt-1">{error || "Check internet connection or coordinates."}</p>
        <button
          onClick={loadWeather}
          className="mt-3 px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-teal-400 text-xs rounded-xl font-medium transition-colors"
        >
          Retry Fetch
        </button>
      </div>
    );
  }

  const condInfo = getWeatherCondition(weather.weatherCode);

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 text-white rounded-2xl p-6 shadow-xl border border-slate-800/80 relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <span className="text-[10px] font-bold tracking-wider uppercase text-teal-400 bg-teal-950/60 px-2.5 py-0.5 rounded-full border border-teal-800/60">
            Open-Meteo Live Forecast
          </span>
          <h4 className="text-lg font-bold mt-1 text-slate-100">{destinationName} Weather</h4>
        </div>
        <button
          onClick={loadWeather}
          title="Refresh forecast"
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-2 items-center py-5 gap-4">
        {/* Left: Temp & Condition */}
        <div className="flex items-center gap-3">
          {renderWeatherIcon(weather.weatherCode)}
          <div>
            <div className="flex items-baseline font-bold">
              <span className="text-4xl text-white">{weather.temp}</span>
              <span className="text-xl text-teal-400">{weather.units.temp}</span>
            </div>
            <p className="text-sm font-semibold text-slate-300 mt-0.5">{condInfo.condition}</p>
          </div>
        </div>

        {/* Right: Stats (Feels Like, Humidity, Wind) */}
        <div className="space-y-2 text-xs text-slate-300 border-l border-slate-800 pl-4">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-slate-400">
              <Thermometer className="w-3.5 h-3.5 text-amber-400" />
              <span>Feels Like:</span>
            </span>
            <span className="font-bold text-white">{weather.feelsLike}{weather.units.temp}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-slate-400">
              <Droplets className="w-3.5 h-3.5 text-sky-400" />
              <span>Humidity:</span>
            </span>
            <span className="font-bold text-white">{weather.humidity}%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-slate-400">
              <Wind className="w-3.5 h-3.5 text-emerald-400" />
              <span>Wind Speed:</span>
            </span>
            <span className="font-bold text-white">{weather.windSpeed} {weather.units.wind}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
