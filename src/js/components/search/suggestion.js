import { store } from '../../../index';
import { debounce } from '../../utils/debounce.js';
import { getCitySuggestion } from '../../api/api.js';
import { showLoader } from '../loader/loader';
import { showErrorMessage } from '../error/error';
import { DELAY_SUGGESTION } from '../../constants/const.js';

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
      container.innerHTML = '';
    }, 2000);
  }

  if (Array.isArray(suggest)) {
    suggest.forEach((item) => {
      const suggestElement = document.createElement('div');
      suggestElement.innerHTML = suggestTemplate(item);

      suggestElement.addEventListener('click', async () => {
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
};

export const onClickSuggest = async ({ location }) => {
  try {
    const city = await store.getWeatherByLocation(location);
    store.addCityToList(city);
  } catch (err) {
    showErrorMessage(err.message);
  }
  removeSuggest();
};

const suggestTemplate = ({ city, district, country }) => {
  return (
    `
      <div class="suggestion">
        <img
          class="suggestion__flag"
          src="https://openweathermap.org/images/flags/${country}.png" 
          alt="flag"
        />
        <span class="suggestion__city">
            ${city}
        </span>
        <span class="suggestion__district">
            , ${district} 
          </span>

        <button class="suggestion-add">+</button>
      </div>
    `
  );
};
