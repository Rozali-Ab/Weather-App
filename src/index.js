import './styles/scss/_index.scss';
import './index.html'

import Store from './js/store/store.js';
import { renderCityList } from "./js/components/sityList/cityList";
import { addFindMeEvent } from "./js/components/search/findMeBtn";
import { searchController } from './js/components/search/search.js';
import { renderWeatherDetails } from "./js/components/weatherDetails/weatherDetails";


export const store = new Store();
searchController();
addFindMeEvent();
renderWeatherDetails();
renderCityList();
