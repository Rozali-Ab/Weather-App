import { store } from "../../store/store";
import { renderWeatherDetails } from "../weatherDetails/weatherDetails";
import { saveCityListToLocalStorage, saveWeatherToLocalStorage } from "../../store/localStore";
import { renderCityList } from "./cityList";

export const renderCityCard = (city) => {
  const container = document.querySelector('.city-list-wrapper');
  container.insertAdjacentHTML('beforeend', cityTemplate(city));

  const lastCityElement = container.lastElementChild;
  const btnDelete = lastCityElement.querySelector('.remover');

  lastCityElement.addEventListener('click', async (evt) => {
    await onClickCityCard(city);
  });

  btnDelete.addEventListener('click', async (evt) => {
    evt.stopPropagation();

    await onDeleteCityCard(city);
  });
}


const onClickCityCard = (cityCard) => {
  store.currentWeather = cityCard;
  renderWeatherDetails(cityCard);
  saveWeatherToLocalStorage(cityCard);
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

  renderCityList();
};

const cityTemplate = (cityCard) => {
  const {
    id,
    city,
    time,
    description,
    temp
  } = cityCard;

  return (
    `
        <div class="city" data-id="${id}">
            <div class="city-description">
                <span class="city-description__name">
                    ${city}
                </span>
                <span class="city-description__time">
                    ${time}
                </span>
                <span class="city-description__description">
                    ${description}
                </span>
            </div>
            <div class="city-temp">
                <span class="city-temp__now">
                    ${temp}C
                </span>
            </div>
            <div class="remover">
                <span class="remover__span">Удалить</span>
            </div>
      </div>
    `
  )
}
