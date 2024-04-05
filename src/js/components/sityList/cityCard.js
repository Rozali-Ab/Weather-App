import { store } from '../../../index';
import { getTextTimeFromUpdate } from '../../utils/getTextTimeFromUpdate';

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
  });

  container.appendChild(cityCard);
};

const onClickCityCard = async (cityCard) => {
  store.updateCurrentWeather(cityCard);
};

const onDeleteCityCard = ({ id }) => {
  store.deleteCityFromListById(id);
};

const cityTemplate = (cityCard) => {
  const {
    id,
    city,
    description,
    temperature,
    icon,
    timeOfDay,
    updatedAt,
  } = cityCard;

  const updatedTime = getTextTimeFromUpdate(updatedAt);

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
                ${temperature.now} °
            </span>
        </div>
        <div class="city-icon">
            <img 
                src="./icons/${icon}.png"
                alt="weather"
            />
        </div>
        <span class="city-description__updated">
            Обновлено ${updatedTime}
        </span>
      </div>
      <button class="remover">
         &#10006;
      </button>
    `
  );
};
