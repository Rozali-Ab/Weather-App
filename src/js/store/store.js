import { getDataByCity, getDataByLocation } from '../api/api';
import { EventEmitter } from '../eventEmitter/eventEmitter';
import { isNeedToUpdate } from '../utils/updateWether';
import { EVENTS_NAME } from '../constants/event';
import { WEATHER_UPDATE_INTERVAL } from '../constants/const';
import { showErrorMessage } from '../components/error/error';

export default class Store {
  constructor() {
    this._currentWeather = {};
    this._cityList = [];
    this._isLoading = false;
    this.eventEmitter = new EventEmitter();

    this.getDataFromLocalStorage();

    setInterval(async () => {
      await this.updateStore();
    }, WEATHER_UPDATE_INTERVAL);
  }

  getCurrentWeather() {
    return this._currentWeather;
  }

  setCurrentWeather(weather) {
    this._currentWeather = weather;
    this.eventEmitter.dispatch(EVENTS_NAME.WEATHER_DETAILS_UPDATED);
  }

  getCityList() {
    return this._cityList;
  }

  setCityList(cityList) {
    this._cityList = cityList;
    this.eventEmitter.dispatch(EVENTS_NAME.LIST_UPDATED);
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
    const weather = await getDataByLocation(location);
    if (weather) {
      weather.isSaved = true;
      this.setCurrentWeather(weather);
      this.setCurrentWeatherToLocalStorage();
      return weather;
    }
  }

  async getWeatherByCityName(cityName) {
    this.setCurrentWeather(await getDataByCity(cityName));
    this.setCurrentWeatherToLocalStorage();
  }

  addCityToList(city) {
    const list = this.getCityList();
    const index = list.findIndex(item => item.id === city.id);
    const isAddedBefore = index !== -1;

    if (!isAddedBefore && list.length < 10) {
      city.isSaved = true;
      list.push(city);
      this.setCityListToLocalStorage();
      this.eventEmitter.dispatch(EVENTS_NAME.LIST_UPDATED);
    } else if (isAddedBefore) {
      throw new Error('Город уже добавлен в список');
    } else {
      throw new Error('Превышено количество городов в списке');
    }
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
    this.setCityListToLocalStorage();
  }

  async updateData(city) {
    const { updatedAt, coordinates } = city;
    if (isNeedToUpdate(updatedAt)) {
      return await getDataByLocation(coordinates);
    } else {
      return city;
    }
  }

  async updateStore() {
    try {
      const currentWeather = this.getCurrentWeather();
      const currentList = this.getCityList();

      if (currentWeather && isNeedToUpdate(currentWeather.updatedAt)) {
        const updatedWeather = await this.getWeatherByLocation(currentWeather.coordinates);
        await this.updateCurrentWeather(updatedWeather);
      }

      if (currentList) {
        const updated = await Promise.all(
          currentList.map(
            async (item) => {
              const updatedItem = await this.updateData(item);
              updatedItem.isSaved = true;
              return updatedItem;
            }
          )
        );
        await this.updateCityList(updated);
      }
    } catch (_) {
      showErrorMessage('Не получилось обновить данные о погоде');
    }
  }

}
