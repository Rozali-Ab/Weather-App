import { store } from "../../store/store";
import { renderWeatherDetails } from "../weatherDetails/weatherDetails";
import { saveCityListToLocalStorage, saveWeatherToLocalStorage } from "../../store/localStore";
import { renderCityList } from "./cityList";

export const renderCityCard = (city) => {
  const container = document.querySelector('.city-list-wrapper');
  container.insertAdjacentHTML('beforeend', cityTemplate(city));

  const lastCityElement = container.lastElementChild;
  const btnDelete = lastCityElement.querySelector('.remover');

  lastCityElement.addEventListener('click', async () => {
    await onClickCityCard(city);
  });

  btnDelete.addEventListener('click', async (evt) => {
    evt.stopPropagation();

    await onDeleteCityCard(city);
  });
}


const onClickCityCard = (cityCard) => {
  store.currentWeather = cityCard;
  saveWeatherToLocalStorage(cityCard);
  renderWeatherDetails();
  renderCityList();
};

const onDeleteCityCard = (card) => {
  if (store.cityList.length === 0) {
    saveCityListToLocalStorage();
    renderCityList();
    return;
  }

  const index = store.cityList.findIndex(city => city.id === card.id);
  if (index !== -1) {
    store.cityList.splice(index, 1);

    saveCityListToLocalStorage(store.cityList);
  }
  renderWeatherDetails();
  renderCityList();
};

const cityTemplate = (cityCard) => {
  const {
    id,
    city,

    description,
    temp,
    icon,
    timeOfDay
  } = cityCard;


  return (
    `
        <div class="city ${timeOfDay}" data-id="${id}">
            <div class="city-description">
                <span class="city-description__name">
                    ${city}
                </span>
                <span class="city-description__description">
                    ${description}
                </span>
            </div>
            <div class="city-temp">
                <span class="city-temp__now">
                    ${temp}
                </span>
            </div>
            <div class="city-icon">
                <img 
                    src="https://openweathermap.org/img/wn/${icon}.png"
                    alt="weather"
                />
            </div>
            <div class="remover ">
                <span class="remover__span">X</span>
            </div>
      </div>
    `
  )
}
