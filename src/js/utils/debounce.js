export const debounce = (fn, delay) => {
  let timer;

  return (...args) => {
    clearTimeout(timer);
    return new Promise((resolve) => {
      timer = setTimeout(() => {
        resolve(fn(...args));
      }, delay);
    });
  };
};
