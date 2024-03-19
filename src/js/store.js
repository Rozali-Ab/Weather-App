import { localStore, localStorageModule, getWeatherFromLocalStorage, getCityListFromLocalStorage, getLocationFromLocalStorage } from './local-storage.js';
import { renderCityList } from './city-list.js';
import { renderWetherDetais } from './weather-details.js';

export const store = {
  currentWeather: {},
  currentGeo: {},
  cityList: [],
  isGeoLocated: false,
};

export const initStore = async () => {
  store.currentWeather = getWeatherFromLocalStorage();
  store.currentGeo = getLocationFromLocalStorage();
  store.cityList = getCityListFromLocalStorage();


  if (!store.currentWeather) {
    localStorageModule.saveData(localStore.currentWeather, '');
    store.currentWeather = {};
  }

  if (!store.currentGeo) {
    localStorageModule.saveData(localStore.location, '');
    store.currentGeo = {};
  }

  if (!store.cityList) {
    localStorageModule.saveData(localStore.cityList, '');
    store.cityList = [];
  }

  renderCityList(store.cityList);
  renderWetherDetais(store.currentWeather);

  return store;
};
