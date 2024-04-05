import { store } from '../../../index';
import { renderCityCard } from './cityCard';

export const renderCityList = () => {
  const list = store.getCityList();
  if (!list) return;

  const listContainer = document.querySelector('.city-list-wrapper');
  listContainer.innerHTML = '';

  if (Array.isArray(list)) {
    list.forEach((item) => {
      renderCityCard(item);
    });
  } else renderCityCard(list);
};
