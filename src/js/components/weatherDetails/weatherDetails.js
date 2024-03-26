import { store } from "../../store/store";
import { renderCityList } from "../sityList/cityList";
import { saveCityListToLocalStorage, saveWeatherToLocalStorage } from "../../store/localStore";

export const renderWeatherDetails = (weather) => {
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
  saveWeatherToLocalStorage(city);
  saveCityListToLocalStorage(store.cityList);
  renderCityList();
  renderWeatherDetails(city);
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
    id
  } = weather;

  const addToListBtn = isSavedCity(id)
    ? '<div class="weather__add hidden"><span>Добавить</span></div>'
    : '<div class="weather__add"><span>Добавить</span></div>';

  return (
    `
    <div class="weather">
      ${addToListBtn}
      <div class="weather-name">
        <span class="weather-name__name">${city}</span>
      </div>
      <div class="weather-temp">
        <span class="weather-temp__now">${temp}C</span>
        <span class="weather-temp__feels">Ощущается как ${feelsLike}C</span>
      </div>
      <div class="weather-description">
        <div class="weather-description__clouds">
          <span>${description}</span>
        </div>
        <div class="weather-description__wrapper">
          <div class="weather-description__wind">
            <span>${wind}</span>
            <span>Ветер</span>
          </div>
          <div class="weather-description__visibility">
            <span>${visibility}</span>
            <span>Видимость</span>
          </div>
          <div class="weather-description__pressure">
            <span>${pressure}</span>
            <span>Давление</span>
          </div>
        </div>
      </div>
    </div>
  `
  );
};
