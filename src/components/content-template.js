import {createElement} from "../utils.js";

const createContentTemplate = () => {
  return (
    `<section class="films">
      <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      </section>
    </section`
  );
};

export default class ContentTemplate {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createContentTemplate();
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


