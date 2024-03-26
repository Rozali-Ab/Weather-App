import { store } from '../../store/store.js';
import { getCitySuggestion, getWeatherByLocation } from '../../api/api.js';
import { debounce } from '../../utils/debounce.js';
import { saveWeatherToLocalStorage } from '../../store/localStore.js';
import { renderWeatherDetails } from "../weatherDetails/weatherDetails";

import { DELAY_SUGGESTION } from '../../constants/const.js';

export const delayedSuggestion = debounce(async (query) => {
  try {
    const suggest = await getCitySuggestion(query);
    renderSuggest(suggest);
    return suggest;
  } catch (error) {
    return null;
  }
}, DELAY_SUGGESTION);

const renderSuggest = (suggest) => {
  if (!suggest) return;

  const container = document.querySelector('.search-list');
  container.innerHTML = '';

  if (Array.isArray(suggest)) {
    suggest.forEach((item) => {
      const suggestElement = document.createElement('div');
      suggestElement.innerHTML = suggestTemplate(item);
      container.appendChild(suggestElement);

      suggestElement.addEventListener('click', async () => {
        await onClickSuggest(item);
      });
    });
  }
};

export const removeSuggest = () => {
  const input = document.querySelector('.search-form__input');
  const container = document.querySelector('.search-list');
  container.innerHTML = '';
  input.value = '';
}

export const onClickSuggest = async (suggest) => {
  const location = {
    lon: suggest.lon,
    lat: suggest.lat,
  };

  try {
    const weather = await getWeatherByLocation(location);
    if (weather) {
      store.currentWeather = weather;
      //store.cityList.push(weather);
      saveWeatherToLocalStorage(weather);
      //saveCityListToLocalStorage(store.cityList);
      //renderCityList();
      renderWeatherDetails(weather);
    }
  } catch (error) {
    console.error(error);
  }

  removeSuggest();
};

const suggestTemplate = ({ city, district }) => {
  return (
    `
      <div class="suggestion">
        <span class="suggestion__city">
            ${city},
        </span>
        <span class="suggestion__district">
            ${district}
        </span>
      </div>
    `
  )
}
