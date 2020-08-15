/* eslint-disable no-extend-native */
export const getRandomNumber = ((min, max) => {
  return min + Math.floor(Math.random() * (max + 1 - min));
});

export const getRandomRating = ((min, max) => {
  return (min + (Math.random() * (max - min))).toFixed(1);
});

export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomNumber(0, array.length - 1);

  return array[randomIndex];
};

export const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    let rand = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[rand]] = [arr[rand], arr[i]];
  }
  return arr;
};

export const getRandomDate = (sing = -1) => {
  const period = 120 * 24 * 60 * 60 * 1000;
  const diffValue = sing * getRandomNumber(0, period);
  const targetDate = new Date(Date.now() + diffValue);

  return targetDate;
};

export const firstLetterCaps = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

