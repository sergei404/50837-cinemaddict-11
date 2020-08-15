import AbstractComponent from "./abstract-component.js";
import {firstLetterCaps} from "../utils/common.js";

const createButtonMarkup = (name) => {
  return (
    `<button
      type="button"
      class="film-card__controls-item film-card__controls-item--${name}">
      ${firstLetterCaps(name.replace(/-/g, ` `)) }
    </button>`
  );
};

const createFilmItem = (item) => {
  const {comments, "film_info": info, "user_details": user} = item;

  const watchlistButton = createButtonMarkup(`add-to-watchlist`);
  const watchedButton = createButtonMarkup(`mark-as-watched`);
  const favoriteButton = createButtonMarkup(`mark-as-favorite`);

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${info.title}</h3>
      <p class="film-card__rating">${info.total_rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${info.release.date}</span>
        <span class="film-card__duration">${info.runtime}</span>
        <span class="film-card__genre">${info.genre[0]}</span>
      </p>
      <img src="./images/posters/${info.poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${info.description.length > 140 ? info.description.slice(0, 139) + `…` : info.description + `.`}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <form class="film-card__controls">
        ${watchlistButton}
        ${watchedButton}
        ${favoriteButton}
      </form>
    </article>`
  );
};

export default class FilmItem extends AbstractComponent {
  constructor(task) {
    super();
    this._task = task;
  }

  getTemplate() {
    return createFilmItem(this._task);
  }

  setFilmHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }

  setWatchlistButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, handler);
  }

  setWatchedButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, handler);
  }

  setFavoriteButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-favorite`)
      .addEventListener(`click`, handler);
  }
}
