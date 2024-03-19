import { renderSearchSection } from './src/js/search.js';
import { renderCityList } from './src/js/city-list.js';
import { initStore } from './src/js/store.js';

document.addEventListener("DOMContentLoaded", () => { 
  initStore();
  renderSearchSection();
  renderCityList();
}); 
