import { initStore } from './store/store.js';
import { renderSearchSection } from './search.js';
import { renderWetherDetais } from './weather-details.js';
import { renderCityList } from './city-list.js';

document.addEventListener("DOMContentLoaded", async () => {
  renderSearchSection();
  const { cityList, currentWeather } = await initStore();
  renderCityList(cityList);
  renderWetherDetais(currentWeather);
});
