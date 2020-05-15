import AbstractComponent from "./abstract-component.js";
import PopupFilmComponent from './film-popup.js';
import PopupCommentsComponent from './film-comments-popup.js';


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

const createPopupTemplate = (item) => {
  const controls = filmDetailsControlsMarkup(controlNames);
  const film = new PopupFilmComponent(item);
  const commented = new PopupCommentsComponent(item);

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          ${film.getTemplate()}
          <section class="film-details__controls">
            ${controls}
          </section>
        </div>
        ${commented.getTemplate()}
      </form>
    </section>`
  );
};

export default class Popup extends AbstractComponent {
  constructor(item) {
    super();
    this._item = item;
  }

  getTemplate() {
    return createPopupTemplate(this._item);
  }

  setPopupHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, handler);
  }
}
