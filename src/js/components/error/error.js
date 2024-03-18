const SHOW_TIME = 5000;

export const showErrorMessage = (message) => {
  const container = document.querySelector('.container');
  const errorElement = document.createElement('div');
  errorElement.textContent = message;
  errorElement.classList.add('toast');

  const closeBtn = document.createElement('button');
  closeBtn.textContent = 'OK';
  closeBtn.classList.add('toast__close');
  closeBtn.addEventListener('click', () => {
    container.classList.add('hidden');
  });

  errorElement.append(closeBtn);
  container.appendChild(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, SHOW_TIME);

};
