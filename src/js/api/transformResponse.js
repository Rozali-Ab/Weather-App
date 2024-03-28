export const transformResponse = (data) => {
  return {
    city: (data && data.name) || '',
    description: getFirstCharToUpperCase((data.weather && data.weather[0] && data.weather[0].description)) || '',
    // clouds: (data.clouds && `${data.clouds.all} %`) || '',
    temp: `${(data.main.temp).toFixed(0)}°`,
    tempMax: `${(data.main.temp_max).toFixed(0)}°`,
    tempMin: `${(data.main.temp_min).toFixed(0)}°`,
    feelsLike: `${(data.main.feels_like).toFixed(0)}°`,
    visibility: `${convertToKm(data.visibility)} км` || '',
    wind: `${(data.wind.speed).toFixed(0)} м/с` || '',
    pressure: `${convertPressureToMmHg(data.main.pressure)}` || '',
    humidity: `${data.main.humidity}%` || '',
    id: data.id || '',
    icon: data.weather[0].icon || '02d',
    timeOfDay: getTimeOfDay(data.weather[0].icon) || 'none',
  }
};

export const transformSuggestion = (data) => {
  if (!data.results || data.results.length === 0) {
    return [];
  }

  return data.results.map(result => ({
    city: result.name,
    district: result.admin1 || '',
    country: (result.country_code).toLowerCase() || '',
    lat: result.latitude,
    lon: result.longitude
  }));
};

const convertToKm = (m) => {
  return m / 1000;
};

const convertPressureToMmHg = (pressure) => {
  return (pressure * 0.75006).toFixed(0);
};

const getTimeOfDay = (string) => {
  return string.includes('d') ? 'day' : 'night';
}

const getFirstCharToUpperCase = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
