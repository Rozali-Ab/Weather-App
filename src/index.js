import './styles/scss/_index.scss';
import './index.html';

import Store from './js/store/store.js';
import { renderCityList } from './js/components/sityList/cityList';
import { addFindMeEvent } from './js/components/search/findMeBtn';
import { searchController } from './js/components/search/search.js';
import { renderWeatherDetails } from './js/components/weatherDetails/weatherDetails';
import { EVENTS_NAME } from './js/constants/event';

export const store = new Store();
store.eventEmitter.subscribe(EVENTS_NAME.WEATHER_DETAILS_UPDATED, () => renderWeatherDetails());
store.eventEmitter.subscribe(EVENTS_NAME.LIST_UPDATED, () => renderCityList());

store.eventEmitter.dispatch(EVENTS_NAME.WEATHER_DETAILS_UPDATED);
store.eventEmitter.dispatch(EVENTS_NAME.LIST_UPDATED);

searchController();
addFindMeEvent();
