import { store } from "../../store/store";
import { renderCityList } from "../sityList/cityList";
import {
  getWeatherFromLocalStorage,
  saveCityListToLocalStorage,
  saveWeatherToLocalStorage
} from "../../store/localStore";
import { ICONS } from "../../constants/icons";

export const renderWeatherDetails = () => {

  const weather = getWeatherFromLocalStorage();

  if (!weather || Object.keys(weather).length === 0) return;

  const container = document.querySelector('.weather-details');
  container.innerHTML = weatherDetailsTemplate(weather);

  const addBtn = container.querySelector('.weather__add');
  if (addBtn) {
    if (!isSavedCity(weather.id)) {
      addBtn.addEventListener('click', () => onClickAddBtn(weather));
    } else {
      addBtn.removeEventListener('click', () => onClickAddBtn(weather));
    }
  }
}

const onClickAddBtn = (city) => {
  store.cityList.push(city);
  saveCityListToLocalStorage(store.cityList);
  saveWeatherToLocalStorage(city);
  renderCityList();
  renderWeatherDetails();
}
const isSavedCity = (id) => {
  return store.cityList.some((city) => city.id === id);
}

const weatherDetailsTemplate = (weather) => {
  const {
    city,
    temp,
    feelsLike,
    description,
    wind,
    visibility,
    pressure,
    id,
    timeOfDay,
    tempMax,
    tempMin,
    humidity
  } = weather;

  const addToListBtn = isSavedCity(id)
    ? '<div class="weather__add hidden"><span>Добавить</span></div>'
    : '<div class="weather__add"><span>Добавить</span></div>';

  return (
    `
    <div class="weather ${timeOfDay}">
      ${addToListBtn}
      <div class="weather-name">
        <span class="weather-name__city">${city}</span>
      </div>
      <div class="weather-temp">
        <span class="weather-temp__now">${temp}</span>
        <span class="weather-temp__maxmin">Макс.: ${tempMax}, мин.: ${tempMin}</span>
        <span class="weather-temp__description">${description}</span>
        <span class="weather-temp__feels">Ощущается как ${feelsLike}</span>
      </div>
      <div class="weather-description">
        <div class="weather-description__wrapper">
          <div class="weather-description__wind">
            <span class="widget-span">${wind}</span>
            <span class="widget-description">${ICONS.Wind} Ветер</span>
          </div>
          <div class="weather-description__visibility">
            <span class="widget-span">${visibility}</span>
            <span class="widget-description">${ICONS.Visibility} Видимость</span>
          </div>
          <div class="weather-description__pressure">
            <span class="widget-span">${pressure} <span class="widget-pressure">мм рт.ст.</span></span>
            <span class="widget-description">${ICONS.Pressure} Давление</span>
          </div>
          <div class="weather-description__pressure">
            <span class="widget-span">${humidity}</span>
            <span class="widget-description">${ICONS.Humidity} Влажность</span>
          </div>
        </div>
      </div>
    </div>
  `
  );
};
