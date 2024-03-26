import { getWeatherByCity } from '../../api/api.js';
import { delayedSuggestion, removeSuggest } from './suggestion.js';

import { store } from '../../store/store.js';
import { renderWeatherDetails } from "../weatherDetails/weatherDetails";
import { saveWeatherToLocalStorage } from "../../store/localStore";
import { showErrorMessage } from "../error/error";

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

  return delayedSuggestion(query);
};

const onFormSubmit = async (evt) => {
  evt.preventDefault();

  const form = evt.target;
  let query = input.value;

  try {
    showCurrentWeather(await getWeatherByCity(query))
  } catch (err) {
    showErrorMessage('По Вашему запросу ничего не найдено');
  }

  form.reset();
  removeSuggest();
};

const showCurrentWeather = (weather) => {
  store.currentWeather = weather;
  saveWeatherToLocalStorage(weather);
  renderWeatherDetails();
}
