import { getCitySuggestion } from './api/api.js';
import { debounce } from './utils/debounce.js';

import { DELAY_SUGGESTION } from './constants/const.js';

const renderSuggestContainer = (suggestList) => {
  const form = document.querySelector('#search-form');
  const suggestContainer = document.createElement('div');
  suggestContainer.classList.add('suggestion');

  removeSuggestContainer();

  if (!suggestList) return;

  if (Array.isArray(suggestList)) {
    suggestList.forEach((item) => {
      const suggest = renderSuggest(item);
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

const renderSuggest = ({title}) => {
  const suggestElement = document.createElement('p');
  suggestElement.textContent = title.text;

  return suggestElement;
};


export const delayedSuggestion = debounce(async (query) => {
  try {
    const suggest = await getCitySuggestion(query);
    renderSuggestContainer(suggest.results);
    return suggest;
  } catch (error) {
    return null;
  }
}, DELAY_SUGGESTION);

