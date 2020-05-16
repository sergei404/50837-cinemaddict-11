export const createElement = (template) => {
  // создаем элемент
  const newElement = document.createElement(`div`);
  // добавляем в него разметку
  newElement.innerHTML = template;
  // возвращаем первый первого потомка созданного элемента
  return newElement.firstChild;
};

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`
};

export const render = (container, componet, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(componet.getElement());
      break;
    case RenderPosition.BEFOREEND:
      container.append(componet.getElement());
      break;
    case RenderPosition.AFTEREND:
      container.after(componet.getElement());
      break;
    case RenderPosition.BEFOREBEGIN:
      container.before(componet.getElement());
      break;
  }
};

export const replace = (newComponent, oldComponent) => {
  const parentElement = oldComponent.getElement().parentElement;
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();

  const isExistElements = !!(newElement && oldElement);

  if (isExistElements) {
    parentElement.replaceChild(newElement, oldElement);
  }
};


export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};
