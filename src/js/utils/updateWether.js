export const isNeedToUpdate = (time) => {
  const now = new Date();
  const updatedAt = new Date(time);

  const differenceMs = now - updatedAt;
  const minutes = Math.round(differenceMs / (1000 * 60));

  return minutes > 5;
};

