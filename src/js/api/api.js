import { URL_MAIN, URL_MAIN_KEY, URL_SUGGESTION } from './keys.js';
import { transformResponce } from './transformResponce.js';
import { DEFAULT_LOCATION } from '../constants/const.js';

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
      throw new Error(response.message);
    }

    const data = await response.json();

    return transformResponce(data);
  } catch (err) {
    console.error(err);
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
      throw new Error(response.message);
    }

    const data = await response.json();

    return transformResponce(data);
  } catch (error) {
    console.error(error);
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

    return data.results;
  } catch (error) {
    return null;
  }
};
