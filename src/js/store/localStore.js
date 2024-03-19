export const localStore = {
  location: 'location',
  currentWeather: 'current weather',
  cityList: 'city list',
}

export const localStorageModule = {
  saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  },
  getData(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  },
  clearData(key) {
    localStorage.removeItem(key);
  },
};

export const saveLocationToLocalStorage = (location) => {
  localStorageModule.saveData(localStore.location, location);
};

export const getLocationFromLocalStorage = () => {
  return localStorageModule.getData(localStore.location);
};

export const saveWeatherToLocalStorage = (weather) => {
  localStorageModule.saveData(localStore.currentWeather, weather);
};

export const getWeatherFromLocalStorage = () => {
  return localStorageModule.getData(localStore.currentWeather);
};

export const saveCityListToLocalStorage = (cityList) => {
  localStorageModule.saveData(localStore.cityList, cityList);
};

export const getCityListFromLocalStorage = () => {
  return localStorageModule.getData(localStore.cityList);
};

