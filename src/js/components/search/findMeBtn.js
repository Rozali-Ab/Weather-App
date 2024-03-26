import { store } from "../../store/store";
import { saveLocationToLocalStorage, saveWeatherToLocalStorage } from "../../store/localStore";
import { getWeatherByLocation } from "../../api/api";
import { renderWeatherDetails } from "../weatherDetails/weatherDetails";

export const addFindMeEvent = () => {
  const findMeBtn = document.querySelector('.search-btn.find-me');
  findMeBtn.addEventListener('click', onClickFindMeBtn);
};

const onClickFindMeBtn = async () => {
  try {
    getUserLocation()
      .then((userLocation) => {
        store.currentGeo = userLocation;
        store.isGeoLocated = true;
        saveLocationToLocalStorage(userLocation);
        console.log(userLocation)
        return userLocation;
      })
      .then((location) => {
        return getWeatherByLocation(location)
      })
      .then((weather) => {
        store.currentWeather = weather;
        saveWeatherToLocalStorage(store.currentWeather);
        renderWeatherDetails(weather);
      })
  } catch (error) {
    console.error(error)
    // рисуем какое-то сообщение
    //DEFAULT_LOCATION ?
  }
}

export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((location) => {
          const userLocation = {
            lon: location.coords.longitude,
            lat: location.coords.latitude
          };

          resolve(userLocation);
        },
        (error) => {
          console.error(error);
          reject(new Error("Ну удалось определить Ваше местоположение"));
        }
      )
    } else {
      reject(new Error("Для получения местоположения включите опцию определения местоположения в настройках вашего браузера"));
    }
  });
};
