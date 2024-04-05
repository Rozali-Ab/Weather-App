import { store } from '../../../index';

const loader = document.getElementById('loader');

export const showLoader = () => {
  const isLoading = store.getIsLoading();

  if (isLoading) {
    loader.classList.remove('hidden');
  } else {
    loader.classList.add('hidden');
  }
};
