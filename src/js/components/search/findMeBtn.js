import { store } from "../../store/store";
import { saveLocationToLocalStorage, saveWeatherToLocalStorage } from "../../store/localStore";
import { getWeatherByLocation } from "../../api/api";
import { renderWeatherDetails } from "../weatherDetails/weatherDetails";
import { showErrorMessage } from "../error/error";

export const addFindMeEvent = () => {
  const findMeBtn = document.querySelector('.search-btn.find-me');
  findMeBtn.addEventListener('click', onClickFindMeBtn);
};

const onClickFindMeBtn = async () => {
  try {
    store.currentGeo = await getUserLocation();
    saveLocationToLocalStorage(store.currentGeo);

    store.currentWeather = await getWeatherByLocation(store.currentGeo);
    saveWeatherToLocalStorage(store.currentWeather);

    renderWeatherDetails();
  } catch (error) {
    showErrorMessage(error.message)
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
          reject(new Error("Для получения местоположения включите опцию определения местоположения в настройках вашего браузера"));
        }
      )
    } else {
      reject(new Error("Для получения местоположения включите опцию определения местоположения в настройках вашего браузера"));
    }
  });
};
