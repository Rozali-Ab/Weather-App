export const transformResponse = (data) => {
  return {
    id: data.id,
    city: data.name,
    coordinates: data.coord,
    temperature: {
      now: Math.round(data.main.temp),
      max: Math.round(data.main.temp_max),
      min: Math.round(data.main.temp_min),
      feelsLike: Math.round(data.main.feels_like),
    },
    cloudiness: data.clouds.all,
    visibility: convertToKm(data.visibility),
    humidity: data.main.humidity,
    wind: data.wind,
    pressure: convertPressureToMmHg(data.main.pressure),
    description: getFirstCharToUpperCase(data.weather[0].description),
    icon: data.weather[0].icon || '02d',
    timeOfDay: getTimeOfDay(data.weather[0].icon) || 'none',
    updatedAt: new Date(),
    isSaved: false,
  };
};

export const transformSuggestion = (data) => {
  if (!data.results || data.results.length === 0) {
    return [];
  }

  return data.results.map(result => ({
    city: result.name,
    district: result.admin1 || '',
    country: (result.country_code).toLowerCase() || '',
    location: {
      lat: result.latitude,
      lon: result.longitude
    }
  }));
};

const convertToKm = (m) => {
  return m / 1000;
};

const convertPressureToMmHg = (pressure) => {
  return Math.round(pressure * 0.75006);
};

const getTimeOfDay = (string) => {
  return string.includes('d') ? 'day' : 'night';
};

const getFirstCharToUpperCase = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
