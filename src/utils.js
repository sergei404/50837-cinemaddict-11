export const createElement = (template, isNodes = false) => {
  // создаем элемент
  const newElement = document.createElement(`div`);
  // добавляем в него разметку
  newElement.innerHTML = template;
  if (isNodes) {
    return newElement.children;
  }
  // возвращаем первый первого потомка созданного элемента
  return newElement.firstChild;
};

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
    case RenderPosition.AFTEREND:
      container.after(element);
      break;
  }
};

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

