import { getCityListFromLocalStorage } from './local-storage.js';

const main = document.querySelector('#main');

export const renderCityList = () => {
  const list = getCityListFromLocalStorage();

  if (!list) return;

  const prevCityList = document.querySelector('.city-list');
  if (prevCityList) {
    prevCityList.remove();
  }

  const listContainer = document.createElement('section');
  listContainer.className = 'city-list';

  if (Array.isArray(list)) {
    list.map((item) => {
      const card = renderCityCard(item);
      listContainer.appendChild(card);
    });
  } else {
    const card = renderCityCard(list);
    listContainer.appendChild(card);
  }

  main.appendChild(listContainer);
};


const renderCityCard = (item) => {
  const {
    city, 
  } = item;
  const cityCard = document.createElement('div');
  cityCard.className = 'city-card';

  const cityName = document.createElement('span');
  cityName.className = 'city-name';
  cityName.textContent = city;

  cityCard.appendChild(cityName);

  return cityCard;
};
// СОБЫТИЕ УДАЛЕНИЯ КАРТОЧКИ и из локала и стора
//онлик и рисовать какой-то main-weather погоду подробно и свежий запрос погоды
