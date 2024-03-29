import { store } from "../../../index";
import { renderWeatherDetails } from "../weatherDetails/weatherDetails";

export const renderCityCard = (city) => {
  const container = document.querySelector('.city-list-wrapper');
  const cityCard = document.createElement('div');

  cityCard.insertAdjacentHTML('beforeend', cityTemplate(city));

  const firstCityElement = cityCard.firstElementChild;
  const btnDelete = cityCard.lastElementChild;

  firstCityElement.addEventListener('click', async () => {
    await onClickCityCard(city);
  });

  btnDelete.addEventListener('click', (evt) => {
    evt.stopPropagation();

    onDeleteCityCard(city);
    container.removeChild(cityCard);
  });

  container.appendChild(cityCard);
}


const onClickCityCard = async (cityCard) => {
  store.updateCurrentWeather(cityCard);
  renderWeatherDetails();
};

const onDeleteCityCard = ({ id, isSaved }) => {
  isSaved = false;
  store.deleteCityFromListById(id);
};

const cityTemplate = (cityCard) => {
  const {
    id,
    city,
    description,
    temperature,
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
                    ${temperature.now}
                </span>
            </div>
            <div class="city-icon">
                <img 
                    src="https://openweathermap.org/img/wn/${icon}.png"
                    alt="weather"
                />
            </div>
            
      </div>
      <button class="remover">
         <span class="remover__span">&#10006;</span>
      </button>
    `
  )
}
