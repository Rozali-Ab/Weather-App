import { delayedSuggestion, removeSuggest } from './suggestion.js';

import { store } from "../../../index";
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
    await store.getWeatherByCityName(query);
  } catch (err) {
    showErrorMessage('По Вашему запросу ничего не найдено');

  } finally {
    form.reset();
    removeSuggest();
  }
};
