import { store } from "../../../index";

import { renderCityList } from "../sityList/cityList";

import { ICONS_MAP } from "../../constants/icons";

export const renderWeatherDetails = () => {

  const weather = store.getCurrentWeather();

  if (!weather || Object.keys(weather).length === 0) return;

  const container = document.querySelector('.weather-details');
  container.innerHTML = weatherDetailsTemplate(weather);

  const addBtn = container.querySelector('.weather__add');
  if (addBtn) {
    if (!weather.isSaved) {
      addBtn.addEventListener('click', () => onClickAddBtn(weather));
    } else {
      addBtn.removeEventListener('click', () => onClickAddBtn(weather));
    }
  }
}

const onClickAddBtn = (city) => {
  city.isSaved = true;

  store.updateCurrentWeather(city);
  store.addCityToList(city);
  renderCityList();
  renderWeatherDetails();
}

const weatherDetailsTemplate = (weather) => {
  const {
    city,
    temperature,
    description,
    wind,
    visibility,
    pressure,
    id,
    timeOfDay,
    humidity,
    isSaved
  } = weather;

  const hidden = isSaved ? 'hidden' : '';

  return (
    `
    <div class="weather ${timeOfDay}">
      <div class="weather__add ${hidden}"><span>Добавить</span></div>
      <div class="weather-name">
        <span class="weather-name__city">${city}</span>
      </div>
      <div class="weather-temp">
        <span class="weather-temp__now">${temperature.now} &#xb0;</span>
        <span class="weather-temp__maxmin">Макс.: ${temperature.max} &#xb0;, мин.: ${temperature.min} &#xb0;</span>
        <span class="weather-temp__description">${description}</span>
        <span class="weather-temp__feels">Ощущается как ${temperature.feelsLike} &#xb0;</span>
      </div>
      <div class="weather-description">
        <div class="weather-description__wrapper">
          <div class="weather-description__wind">
            <span class="widget-span">${wind.speed}</span>
            <span class="widget-span-unit">м/с</span>
            <span class="widget-description">${ICONS_MAP.WIND} Ветер</span>
          </div>
          <div class="weather-description__visibility">
            <span class="widget-span">${visibility}</span>
            <span class="widget-span-unit">км</span>
            <span class="widget-description">${ICONS_MAP.VISIBILITY} Видимость</span>
          </div>
          <div class="weather-description__pressure">
            <span class="widget-span">${pressure}</span>
            <span class="widget-span-unit">мм рт.ст.</span>
            <span class="widget-description">${ICONS_MAP.PRESSURE} Давление</span>
          </div>
          <div class="weather-description__pressure">
            <span class="widget-span">${humidity} %</span>
            <span class="widget-description">${ICONS_MAP.HUMIDITY} Влажность</span>
          </div>
        </div>
      </div>
    </div>
  `
  );
};
