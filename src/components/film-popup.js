import AbstractComponent from "./abstract-component.js";
import {controlNames} from '../const.js';

const genreMarkup = (genre) => {
  return genre
    .map((item) => {
      return (
        `<span class="film-details__genre">${item}</span>`
      );
    }).join(`\n`);
};

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


const createPopupFilmTemplate = (item) => {
  const {"film_info": info, "user_details": details} = item;
  const {title, alternative_title: original, poster, total_rating: rating, director, writers, actors, release: {date: data, release_country: country}, runtime, genre, description} = info;
  const controls = filmDetailsControlsMarkup(controlNames);
  const genres = genreMarkup(genre);
  return (
    `<div class="form-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>

      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="./images/posters/${poster}" alt="">

          <p class="film-details__age">${details[`personal_rating`]}+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">Original: ${original}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${rating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writers}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${data}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${runtime}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">${genres}</td>
            </tr>
          </table>

          <p class="film-details__film-description">
            ${description}
          </p>
        </div>
      </div>
      <section class="film-details__controls">
        ${controls}
      </section>
    </div>`
  );
};

export default class PopupFilm extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createPopupFilmTemplate(this._filters);
  }

  setPopupHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, handler);
  }
}
