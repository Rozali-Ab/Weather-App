const SHOW_TIME = 5000;

export const showErrorMessage = (message) => {
  const container = document.createElement('div');
  container.textContent = message;
  container.classList.add('toast');

  const closeBtn = document.createElement('button');
  closeBtn.textContent = 'OK';
  closeBtn.classList.add('toast__close');
  closeBtn.addEventListener('click', () => {
    container.classList.add('hidden');
  });

  container.append(closeBtn);
  document.body.append(container);

  setTimeout(() => {
    container.remove();
  }, SHOW_TIME);

};
