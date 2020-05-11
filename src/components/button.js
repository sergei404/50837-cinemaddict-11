import AbstractComponent from "./abstract-component.js";

const createButton = () => {
  return (
    `<button class="films-list__show-more">
      Show more
    </button>`
  );
};

export default class Button extends AbstractComponent {
  getTemplate() {
    return createButton();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
