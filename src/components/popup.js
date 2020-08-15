import AbstractSmartComponent from "./abstract-smart-component.js";
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

export default class Popup extends AbstractSmartComponent {
  constructor(item) {
    super();
    this._item = item;
    this._submitHandler = null;

    this._subscribeOnEvents();
  }

  getTemplate() {
    return createPopupTemplate(this._item);
  }

  recoveryListeners() {
    this.setSubmitHandler(this._submitHandler);
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
  }

  setPopupHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, handler);

    this._submitHandler = handler;
  }

  setWatchlistButtonClickHandler(handler) {
    this.getElement().querySelector(`#watchlist`)
      .addEventListener(`click`, handler);
  }

  setWatchedButtonClickHandler(handler) {
    this.getElement().querySelector(`#watched`)
      .addEventListener(`click`, handler);
  }

  setFavoriteButtonClickHandler(handler) {
    this.getElement().querySelector(`#favorite`)
      .addEventListener(`click`, handler);
  }

  _subscribeOnEvents() {
  //   const element = this.getElement();

  //   element.querySelector(`.card__date-deadline-toggle`)
  //     .addEventListener(`click`, () => {
  //       this._isDateShowing = !this._isDateShowing;

  //       this.rerender();
  //     });

  //   element.querySelector(`.card__repeat-toggle`)
  //     .addEventListener(`click`, () => {
  //       this._isRepeatingTask = !this._isRepeatingTask;

  //       this.rerender();
  //     });

  //   element.querySelector(`.card__repeat-toggle`)
  //     .addEventListener(`click`, () => {
  //       this._isRepeatingTask = !this._isRepeatingTask;

  //       this.rerender();
  //     });


  //   const repeatDays = element.querySelector(`.card__repeat-days`);
  //   if (repeatDays) {
  //     repeatDays.addEventListener(`change`, (evt) => {
  //       this._activeRepeatingDays[evt.target.value] = evt.target.checked;

  //       this.rerender();
  //     });
  //   }
  }
}
