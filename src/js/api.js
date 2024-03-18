//import { transformResponce } from './utils.js';
import { URL, API_KEY, SUGGESTION_API, SUGGESTION_API_KEY } from '../../config.js';
import { DEFAULT_LOCATION  } from './const.js';

const url = URL;
const key = API_KEY;
const suggestUrl = SUGGESTION_API;
const suggestKey = SUGGESTION_API_KEY;

export const getWeatherByLocation = async (location) => {
  let {lon, lat} = location ?? DEFAULT_LOCATION ;

  try {
    const response = await fetch(`${url}lat=${lat}&lon=${lon}&appid=${key}&units=metric&lang=ru`);
    if (!response.ok) {
      throw new Error(response.message);
    }

    const data = await response.json();

    console.log(data);
    return data;
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

    return data;
  } catch(error) {
    console.error(error);
  }
};

export const getCitySuggestion = async (query) => {
  try {
    const response = await fetch(`${suggestUrl}text=${query}&type=locality&apikey=${suggestKey}`);
    if(!response.ok) {
      return null;
    }

    const data = await response.json();

    return data;
  } catch (error) {
    return null;
  }
};

