import './styles/scss/_index.scss';

import { initStore } from './js/store/store.js';
import { renderSearchSection } from './js/search.js';
import { renderWetherDetais } from './js/weather-details.js';
import { renderCityList } from './js/city-list.js';

document.addEventListener("DOMContentLoaded", async () => {
  renderSearchSection();
  const { cityList, currentWeather } = await initStore();
  renderCityList(cityList);
  renderWetherDetais(currentWeather);
});
