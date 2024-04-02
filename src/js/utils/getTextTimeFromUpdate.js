export const getTextTimeFromUpdate = (timeOfLastUpdate) => {
  const now = new Date();
  const updatedAt = new Date(timeOfLastUpdate);

  const differenceMs = now - updatedAt;
  const minutes = Math.round(differenceMs / (1000 * 60));

  if (minutes >= 1 && minutes < 60) {
    return `${minutes} мин. назад`;
  }
  if (minutes < 1) {
    return 'только что';
  }
  if (minutes >= 60) {
    return 'давно';
  }
};
