import AbstractComponent from "./abstract-component.js";

const createFilmsTemplate = () => {
  return (
    `<div class="films-list__container"></div>`
  );
};


export default class Films extends AbstractComponent {
  getTemplate() {
    return createFilmsTemplate();
  }

  setFilmHandler(handler) {
    // console.log(this.getElement());
    const el = this.getElement().querySelector(`.films-list__container`);
    if (el) {
      el.addEventListener(`click`, handler);
    }
  }
}
