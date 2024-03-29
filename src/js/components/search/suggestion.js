import { store } from "../../../index";
import { debounce } from '../../utils/debounce.js';
import { getCitySuggestion } from '../../api/api.js';

import { DELAY_SUGGESTION } from '../../constants/const.js';
import { showLoader } from "../loader/loader";
import { renderWeatherDetails } from "../weatherDetails/weatherDetails";
import { renderCityList } from "../sityList/cityList";
import { showErrorMessage } from "../error/error";


const container = document.querySelector('.search-list');
const input = document.querySelector('.search-form__input');

export const delayedSuggestion = debounce(async (query) => {
  store.setIsLoading(true);
  showLoader();
  try {
    const suggest = await getCitySuggestion(query);
    renderSuggest(suggest);
    return suggest;
  } catch (error) {
    return null;
  } finally {
    store.setIsLoading(false);
    showLoader();
  }
}, DELAY_SUGGESTION);

const renderSuggest = (suggest) => {
  container.innerHTML = '';

  if (!suggest || suggest.length === 0) {
    container.textContent = 'Ничего не найдено';
    setTimeout(() => {
      container.innerHTML = ''
    }, 2000);
  }

  if (Array.isArray(suggest)) {
    suggest.forEach((item) => {
      const suggestElement = document.createElement('div');
      suggestElement.innerHTML = suggestTemplate(item);

      suggestElement.addEventListener('click', async () => {
        console.log(item)
        await onClickSuggest(item);
      });
      container.appendChild(suggestElement);
    });
  }

  if (!store.getIsLoading()) {
    removeSuggest();
  }
};

export const removeSuggest = () => {
  container.innerHTML = '';
  input.value = '';
}

export const onClickSuggest = async ({ location }) => {
  try {
    const city = await store.getWeatherByLocation(location);
    city.isSaved = true;
    store.addCityToList(city);
    renderCityList();
    renderWeatherDetails();
  } catch (err) {
    showErrorMessage('Не удалось добавить в список')
    throw err;
  }
  removeSuggest();
};

const suggestTemplate = ({ city, district, country, location }) => {
  return (
    `
      <div class="suggestion">
        <span class="suggestion__city">
            ${city}
        </span>
        <span class="suggestion__district">
            , ${district} 
          </span>
        <img
            class="suggestion__flag"
            src="https://openweathermap.org/images/flags/${country}.png" 
             alt="flag"
        />
        <button>Добавить</button>
      </div>
    `
  )
}
