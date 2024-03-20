import { transformResponce } from './transformResponce.js';
import { DEFAULT_LOCATION  } from '../constants/const.js';

const url = 'https://api.openweathermap.org/data/2.5/weather?';
const key = '80c8f308f64f79052a0be055b0e3c826';

export const getWeatherByLocation = async (location) => {
  let {lon, lat} = location ?? DEFAULT_LOCATION ;

  try {
    const response = await fetch(`${url}lat=${lat}&lon=${lon}&appid=${key}&units=metric&lang=ru`);
    if (!response.ok) {
      throw new Error(response.message);
    }

    const data = await response.json();

    const tranformedData = transformResponce(data);

    return tranformedData;
  } catch (err) {
    console.error(err);
  }
};

export const getWeatherByCity = async (query) => {
  try {
    const response = await fetch(`${url}q=${query}&appid=${key}&units=metric&lang=ru`);
    if (!response.ok) {
      throw new Error(response.message);
    }

    const data = await response.json();
    const tranformedData = transformResponce(data);

    return tranformedData;
  } catch(error) {
    console.error(error);
  }
};

export const getCitySuggestion = async (query) => {
  try {
    const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=5&language=ru&format=json`);
    if(!response.ok) {
      return null;
    }

    const data = await response.json();

    return data.results;
  } catch (error) {
    return null;
  }
};
