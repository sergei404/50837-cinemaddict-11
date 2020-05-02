import {createElement} from '../utils.js';
import {controlNames} from '../const.js';

const filmDetailsControlsMarkup = (controls) => {
  return controls
    .map((control) => {
      return (
        `<input type="checkbox" class="film-details__control-input visually-hidden"
          id="${control.name}" name="${control.name}">
        <label for="${control.name}" class="film-details__control-label
          film-details__control-label--${control.name}">
          ${control.text}
        </label>`
      );
    }).join(`\n`);
};

const createPopupTemplate = () => {
  const controls = filmDetailsControlsMarkup(controlNames);
  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <section class="film-details__controls">
            ${controls}
          </section>
        </div>
      </form>
    </section>`
  );
};

export default class Popup {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createPopupTemplate();
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

