import { getWeatherByCity } from '../../api/api.js';
import { delayedSuggestion, removeSuggest } from './suggestion.js';

import { store } from '../../store/store.js';
import { renderWeatherDetails } from "../weatherDetails/weatherDetails";
import { saveWeatherToLocalStorage } from "../../store/localStore";

const form = document.querySelector('.search-form');
const input = form.querySelector('.search-form__input');
export const searchController = () => {

  input.addEventListener('input', async (evt) => {
    await onChangeHandler(evt);
  });

  form.addEventListener('submit', async (evt) => {
    await onFormSubmit(evt);
  });
}


const onChangeHandler = (evt) => {
  const input = evt.target;
  const query = input.value;
  try {
    return delayedSuggestion(query);
  } catch (err) {
    console.error(err)
  }
};

const onFormSubmit = async (evt) => {
  evt.preventDefault();

  const form = evt.target;
  const input = form.querySelector('.search-form__input');
  let query = input.value;

  try {
    const weather = await getWeatherByCity(query);
    if (weather) {
      store.currentWeather = weather;
      //store.cityList.push(weather);

      saveWeatherToLocalStorage(weather);
      //saveCityListToLocalStorage(store.cityList);
      //renderCityList();
      renderWeatherDetails(weather);
    }

  } catch (err) {
    console.error(err);
  }

  form.reset();
  removeSuggest();
};

