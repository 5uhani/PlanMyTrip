import axios from 'axios';

/**
 * Fetch country details from REST Countries API
 * @param {string} countryCode - ISO alpha-3 code (e.g., 'FRA', 'IDN', 'JPN')
 */
export const fetchCountryInfo = async (countryCode) => {
  if (!countryCode) return null;
  try {
    const response = await axios.get(`https://restcountries.com/v3.1/alpha/${countryCode}`);
    if (response.data && response.data.length > 0) {
      const data = response.data[0];
      return {
        name: data.name?.common || countryCode,
        officialName: data.name?.official || '',
        capital: data.capital ? data.capital[0] : 'N/A',
        region: data.region || 'World',
        subregion: data.subregion || '',
        population: data.population || 0,
        currencies: data.currencies ? Object.values(data.currencies).map(c => `${c.name} (${c.symbol || ''})`).join(', ') : 'N/A',
        languages: data.languages ? Object.values(data.languages).join(', ') : 'N/A',
        flag: data.flags?.svg || data.flags?.png || '',
        flagEmoji: data.flag || '🏳️',
        googleMapsUrl: data.maps?.googleMaps || null,
        timezones: data.timezones ? data.timezones.slice(0, 2).join(', ') : 'UTC'
      };
    }
    return null;
  } catch (error) {
    console.warn(`Could not fetch country info for ${countryCode}:`, error.message);
    return null;
  }
};

/**
 * Fetch current live weather from Open-Meteo API (free, no API key required)
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 */
export const fetchCurrentWeather = async (lat, lng) => {
  if (lat === undefined || lng === undefined) return null;
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&temperature_unit=celsius&wind_speed_unit=kmh`;
    const response = await axios.get(url);
    if (response.data && response.data.current) {
      const curr = response.data.current;
      return {
        temp: Math.round(curr.temperature_2m),
        feelsLike: Math.round(curr.apparent_temperature),
        humidity: curr.relative_humidity_2m,
        windSpeed: Math.round(curr.wind_speed_10m),
        weatherCode: curr.weather_code,
        units: {
          temp: '°C',
          wind: 'km/h'
        }
      };
    }
    return null;
  } catch (error) {
    console.warn(`Could not fetch weather for coordinates (${lat}, ${lng}):`, error.message);
    return null;
  }
};
