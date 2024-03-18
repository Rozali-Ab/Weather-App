import { store } from './store/store.js';
import { getCitySuggestion, getWeatherByLocation } from './api/api.js';
import { debounce } from './utils/debounce.js';
import { saveWeatherToLocalStorage, saveCityListToLocalStorage } from './store/localStore.js';
import { renderWetherDetais } from './weather-details.js';

import { DELAY_SUGGESTION } from './constants/const.js';
import { renderCityList } from './city-list.js';

const renderSuggestContainer = (suggestList) => {
  const form = document.querySelector('#search-form');
  const suggestContainer = document.createElement('div');
  suggestContainer.classList.add('suggestion');

  removeSuggestContainer();

  if (!suggestList) return;

  if (Array.isArray(suggestList)) {
    suggestList.forEach((item) => {
      const suggest = renderSuggest(item);

      suggest.addEventListener('click', async () => {
        onClickSuggest(item)
      }); 
      suggestContainer.appendChild(suggest);
    });
  } else {
    const suggest = renderSuggest(suggestList);
    suggestContainer.appendChild(suggest);
  }

  form.appendChild(suggestContainer);
};

export const removeSuggestContainer = () => {
  const container = document.querySelector('.suggestion');
  
  return container ? container.remove() : null;
};

const renderSuggest = ({name, admin1: district}) => {
  const suggestElement = document.createElement('p');
  suggestElement.textContent = `${name} - ${district}`;

  return suggestElement;
};


export const delayedSuggestion = debounce(async (query) => {
  try {
    const suggest = await getCitySuggestion(query);
    renderSuggestContainer(suggest);
    return suggest;
  } catch (error) {
    return null;
  }
}, DELAY_SUGGESTION);

const onClickSuggest = async (suggest) => {
  const input = document.querySelector('#search-input');

  const location = {
    lon: suggest.longitude,
    lat: suggest.latitude,
  };

  try {
    const weather = await getWeatherByLocation(location);
    if (weather) {
      store.currentWeather = weather;
      store.cityList.push(weather);
      
      saveWeatherToLocalStorage(weather);
      saveCityListToLocalStorage(store.cityList);
      renderCityList();
      renderWetherDetais(weather);
    }
  } catch (error) {
    console.error(error);
  }
  
  input.value = '';
  removeSuggestContainer();
};
