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

  // setFilmHandler(handler) {
  //   this.getElement().addEventListener(`click`, handler);
  // }
}

