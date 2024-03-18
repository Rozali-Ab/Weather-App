const main = document.querySelector('#main');

export const renderWetherDetais = (weather) => {
  if (!weather || Object.keys(weather).length === 0 ) return;

  const {
    city,
    temp,
    feelsLike,
    description,
  } = weather;


  const prevdetailsContainer = document.querySelector('.weather-details-container');
  if (prevdetailsContainer) prevdetailsContainer.remove();

  const detailsContainer = document.createElement('section');
  detailsContainer.className = 'weather-details-container';

  const cityName = document.createElement('h3');
  cityName.textContent = city;

  const temperature = document.createElement('span');
  temperature.textContent = temp;

  const temperatureFeels = document.createElement('span');
  temperatureFeels.textContent = `Ощущается как ${feelsLike}`;

  const weatherDescription = document.createElement('b');
  weatherDescription.textContent = description;

  detailsContainer.appendChild(cityName);
  detailsContainer.appendChild(temperature);
  detailsContainer.appendChild(temperatureFeels);
  detailsContainer.appendChild(weatherDescription);

  main.appendChild(detailsContainer);
}
