import { getCityListFromLocalStorage } from './store/localStore.js';

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

  const ul = document.createElement('ul');
  ul.textContent = 'city list';

  if (Array.isArray(list)) {
    list.map((item) => {
      const card = renderCityCard(item);
      ul.appendChild(card);
    });
  } else {
    const card = renderCityCard(list);
    ul.appendChild(card);
  }

  listContainer.appendChild(ul);
  main.appendChild(listContainer);
};


const renderCityCard = (item) => {
  const {
    city, 
    temp,
  } = item;

  const li = document.createElement('li');

  const cityCard = document.createElement('div');
  cityCard.className = 'city-card';

  const cityName = document.createElement('li');
  cityName.className = 'city-name';
  cityName.textContent = `${city} ${temp}`;

  cityCard.appendChild(cityName);
  li.appendChild(cityCard);

  return li;
};
// СОБЫТИЕ УДАЛЕНИЯ КАРТОЧКИ и из локала и стора
//онлик и рисовать какой-то main-weather погоду подробно и свежий запрос погоды
