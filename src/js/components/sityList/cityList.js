import { getCityListFromLocalStorage } from '../../store/localStore.js';
import { renderCityCard } from "./cityCard";


export const renderCityList = () => {
  const list = getCityListFromLocalStorage();

  if (!list) return;

  const listContainer = document.querySelector('.city-list-wrapper');
  listContainer.innerHTML = '';

  if (Array.isArray(list)) {
    list.map((item) => {
      renderCityCard(item);
    });
  } else {
    listContainer.innerHTML = '';
  }
};
