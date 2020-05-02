import {createElement} from "../utils.js";

const createFilmsTemplate = () => {
  return (
    `<div class="films-list__container"></div>`
  );
};


export default class Tasks {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmsTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
