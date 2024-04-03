import { transformResponse, transformSuggestion } from './transformResponse.js';
import { showLoader } from "../components/loader/loader";
import { store } from "../../index";

const URL_MAIN = process.env.URL_MAIN;
const URL_MAIN_KEY = process.env.URL_MAIN_KEY;
const URL_SUGGESTION = process.env.URL_SUGGESTION;


const fetchData = async (params) => {
  store.setIsLoading(true);
  showLoader();
  const url = `${URL_MAIN}${(params.toString())}`

  try {
    const response = await fetch(url);
    const data = await response.json();
    return transformResponse(data);
  } catch (err) {
    throw new Error('Не удалось получить данные о погоде');
  } finally {
    store.setIsLoading(false);
    showLoader();
  }
}
export const getDataByLocation = async (location) => {
  const { lon, lat } = location;

  const params = new URLSearchParams({
    lat: lat,
    lon: lon,
    appid: URL_MAIN_KEY,
    units: 'metric',
    lang: 'ru',
  });

  return await fetchData(params);
};

export const getDataByCity = async (query) => {
  const params = new URLSearchParams({
    q: query,
    appid: URL_MAIN_KEY,
    units: 'metric',
    lang: 'ru',
  });

  return await fetchData(params);
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
    const data = await response.json();

    return transformSuggestion(data);
  } catch (error) {
    return null;
  }
};
