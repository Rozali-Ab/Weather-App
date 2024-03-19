import { getWeatherByLocation, getWeatherByCity } from './api/api.js';
import { delayedSuggestion, removeSuggestContainer } from './suggestion.js';
import { renderWetherDetais } from './weather-details.js';
import { saveCityListToLocalStorage, saveLocationToLocalStorage, saveWeatherToLocalStorage } from './store/localStore.js';

import { store } from './store/store.js';

const main = document.querySelector('#main');

export const renderSearchSection = () => {
  const searchSection = document.createElement('section');
  searchSection.className = 'search-section';

  const form = renderSearchForm();
  const findMeBtn = renderFindMeBtn();

  searchSection.appendChild(form);
  searchSection.appendChild(findMeBtn);
  main.appendChild(searchSection);
};

const renderSearchForm = () => {
  const form = document.createElement('form');
  form.classList.add('search-form');
  form.id = 'search-form';

  const label = document.createElement('label');
  label.htmlFor = 'search-input';

  const input = document.createElement('input');
  input.classList.add('search-form__input');
  input.type = 'text';
  input.placeholder = 'Введите название населенного пункта';
  input.id = 'search-input';

  label.appendChild(input);
  form.appendChild(label);

  input.addEventListener('input', onChangeHandler);
  form.addEventListener('submit', onFormSubmit);
  
  return form;
};

const renderFindMeBtn = () => {
  const findMeBtn = document.createElement('button');
  findMeBtn.classList.add('search-form__button');
  findMeBtn.textContent = 'Найти меня';

  findMeBtn.addEventListener('click', onClickFindMeBtn);

  return findMeBtn;
};

const onClickFindMeBtn = () => {
  try {
    getUserLocation()
      .then((userLocation) => {
        store.currentGeo = userLocation;
        store.isGeoLocated = true;
        saveLocationToLocalStorage(userLocation);
        return userLocation;
      })
      .then((location)=> {
        return getWeatherByLocation(location)
      })
      .then((weather) => {
        store.currentWeather = weather;
        saveWeatherToLocalStorage(store.currentWeather);
        console.log(weather);
        renderWetherDetais(weather);
      })
  } catch(error) {
    console.error(error)
   // рисуем какое-то сообщение 
   //DEFAULT_LOCATION ?
  }
}

const onChangeHandler = (evt) => {
  const input = evt.target;
  const query = input.value;

  delayedSuggestion(query)
};

const onFormSubmit = async (evt) => {
  evt.preventDefault();

  const form = evt.target;
  const input = form.querySelector('#search-input');
  const query = input.value;

  try {
    const weather = await getWeatherByCity(query);
      if (weather) {
        store.currentWeather = weather;
        store.cityList.push(weather);
        saveWeatherToLocalStorage(store.currentWeather);
        saveCityListToLocalStorage(store.cityList);
        renderWetherDetais(weather)
      }

  } catch (err) {
    console.error(err);
  }
  
  input.value = '';
  removeSuggestContainer();
};

export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((location) => {
        const userLocation = {
          lon: location.coords.longitude,
          lat: location.coords.latitude
        }; 

        console.log(userLocation)
        resolve(userLocation);
    }, 
    (error) => {
      console.error(error);
      reject(new Error("Ну удалось определить Ваше местоположение"));
    }
  )} else {
    reject(new Error("Для получения местоположения включите опцию определения местоположения в настройках вашего браузера"));
    }
  });
};

