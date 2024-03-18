import { getCityListFromLocalStorage, saveCityListToLocalStorage, saveWeatherToLocalStorage } from './store/localStore.js';
import { renderWetherDetais } from './weather-details.js';
import { store } from './store/store.js';

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

  const cityName = document.createElement('span');
  cityName.className = 'city-name';
  cityName.textContent = `${city} ${temp}`;

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Х';

  cityCard.appendChild(cityName);
  cityCard.appendChild(deleteBtn);
  li.appendChild(cityCard);

  deleteBtn.addEventListener('click', () => {
    deleteCityCard(item);
    li.remove();
  });

  li.addEventListener('click', async () => {
    onClickCityCard(item);
  });

  return li;
};

const onClickCityCard = (cityCard) => {
  store.currentWeather = cityCard;
  renderWetherDetais(cityCard);
  saveWeatherToLocalStorage(cityCard);
};

const deleteCityCard = (card) => {
  if (store.cityList.length === 0) {
    saveCityListToLocalStorage();
    return;
  };
  
  const index = store.cityList.findIndex(city => city.id === card.id);
  console.log(index)
  if (index !== -1) {
    store.cityList.splice(index, 1);
    
    saveCityListToLocalStorage(store.cityList);
  }
};
