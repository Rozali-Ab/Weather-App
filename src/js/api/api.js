import { transformResponse, transformSuggestion } from './transformResponse.js';
import { DEFAULT_LOCATION } from '../constants/const.js';

const URL_MAIN = process.env.URL_MAIN;
const URL_MAIN_KEY = process.env.URL_MAIN_KEY;
const URL_SUGGESTION = process.env.URL_SUGGESTION;

export const getWeatherByLocation = async (location) => {
  let { lon, lat } = location ?? DEFAULT_LOCATION;

  const params = new URLSearchParams({
    lat: lat,
    lon: lon,
    appid: URL_MAIN_KEY,
    units: 'metric',
    lang: 'ru',
  });
  const url = `${URL_MAIN}${(params.toString())}`

  try {
    const response = await fetch(url);
    if (!response.ok) {
      new Error('Не удалось получить данные о погоде');
    }

    const data = await response.json();
    return transformResponse(data);
  } catch (err) {
    throw new Error('Не удалось получить данные о погоде');
  }
};

export const getWeatherByCity = async (query) => {
  const params = new URLSearchParams({
    q: query,
    appid: URL_MAIN_KEY,
    units: 'metric',
    lang: 'ru',
  });
  const url = `${URL_MAIN}${(params.toString())}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      new Error('По Вашему запросу погода не найдена');
    }

    const data = await response.json();
    return transformResponse(data);
  } catch (err) {
    throw err;
  }
};

export const getCitySuggestion = async (query) => {
  const params = new URLSearchParams({
    name: query,
    count: 5,
    language: 'ru',
    format: 'json',
  });
  const url = `${URL_SUGGESTION}${(params.toString())}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return transformSuggestion(data);
  } catch (error) {
    return null;
  }
};
