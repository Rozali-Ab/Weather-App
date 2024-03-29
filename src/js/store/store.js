import { getDataByCity, getDataByLocation } from "../api/api";

export default class Store {
  constructor() {
    this._currentWeather = {};
    this._cityList = [];
    this._isLoading = false;

    this.getDataFromLocalStorage();
  }

  getCurrentWeather() {
    return this._currentWeather;
  }

  setCurrentWeather(weather) {
    this._currentWeather = weather;
  }

  getCityList() {
    return this._cityList;
  }

  setCityList(cityList) {
    this._cityList = cityList;
  }

  getIsLoading() {
    return this._isLoading;
  }

  setIsLoading(loading) {
    this._isLoading = loading;
  }


  getDataFromLocalStorage() {
    const storedWeather = localStorage.getItem('currentWeather');
    if (storedWeather) {
      this.setCurrentWeather((JSON.parse(storedWeather)));
    }

    const storedList = localStorage.getItem('cityList');
    if (storedList) {
      this.setCityList(JSON.parse(storedList));
    }
  }

  setCurrentWeatherToLocalStorage() {
    localStorage.setItem('currentWeather', JSON.stringify(this.getCurrentWeather()));
  }

  setCityListToLocalStorage() {
    localStorage.setItem('cityList', JSON.stringify(this.getCityList()));
  }

  async getWeatherByLocation(location) {
    try {
      const weather = await getDataByLocation(location);
      if (weather) {
        this.setCurrentWeather(weather);
        this.setCurrentWeatherToLocalStorage();
        return weather;
      }
    } catch (err) {
      throw err
    }
  }

  async getWeatherByCityName(cityName) {
    this.setCurrentWeather(await getDataByCity(cityName));
    this.setCurrentWeatherToLocalStorage();
  }

  addCityToList(city) {
    this.getCityList().push(city);
    this.setCityListToLocalStorage(this.getCityList());
  }

  deleteCityFromListById(id) {
    const index = this.getCityList().findIndex(city => city.id === id);

    if (index !== -1) {
      const updatedList = this.getCityList().slice();
      updatedList.splice(index, 1);
      this.updateCityList(updatedList);
    }
  }

  updateCurrentWeather(currentWeather) {
    this.setCurrentWeather(currentWeather);
    this.setCurrentWeatherToLocalStorage();
  }

  updateCityList(updatedList) {
    this.setCityList(updatedList);
    this.setCityListToLocalStorage(updatedList);
  }
}
