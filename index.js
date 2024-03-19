import { renderSearchSection } from './src/js/search.js';
import { initStore } from './src/js/store.js';

document.addEventListener("DOMContentLoaded", () => { 
  renderSearchSection();
  initStore();
}); 
