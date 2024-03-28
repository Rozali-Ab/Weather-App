import './styles/scss/_index.scss';
import './index.html'

import { renderWeatherDetails } from "./js/components/weatherDetails/weatherDetails";
import { renderCityList } from "./js/components/sityList/cityList";
import { initStore } from './js/store/store.js';
import { addFindMeEvent } from "./js/components/search/findMeBtn";
import { searchController } from './js/components/search/search.js';

await initStore();

searchController();
addFindMeEvent();
renderCityList();
renderWeatherDetails();
