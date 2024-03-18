import { getWeatherFromLocalStorage, getCityListFromLocalStorage, getLocationFromLocalStorage } from './localStore.js';

export const store = {
  currentWeather: {},
  currentGeo: {},
  cityList: [],
};

export const initStore = async () => {
  store.currentWeather = getWeatherFromLocalStorage() || {};
  store.currentGeo = getLocationFromLocalStorage() || {};
  store.cityList = getCityListFromLocalStorage() || [];

  return store;
};
