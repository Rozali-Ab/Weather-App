export const transformResponse = (data) => {
  return {
    city: (data && data.name) || '',
    description: (data.weather && data.weather[0] && data.weather[0].description) || '',
    // clouds: (data.clouds && `${data.clouds.all} %`) || '',
    temp: `${(data.main.temp).toFixed(0)}°`,
    feelsLike: `${(data.main.feels_like).toFixed(0)}°`,
    visibility: `${convertToKm(data.visibility)} км` || '',
    wind: `${(data.wind.speed).toFixed(0)} м/с` || '',
    pressure: `${convertPressureToMmHg(data.main.pressure)} мм рт. ст.` || '',
    id: data.id || '',
    time: data.time || ''
  }
};

export const transformSuggestion = (data) => {
  if (!data.results || data.results.length === 0) {
    return [];
  }

  return data.results.map(result => ({
    city: result.name,
    district: result.admin1 || '',
    country: result.country_code || '',
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
