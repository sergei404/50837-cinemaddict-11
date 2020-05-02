import {createElement} from '../utils.js';

const createFilmItem = (item) => {
  const {comments, "film_info": info} = item;

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
      <p class="film-card__description">${info.description}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">
        Add to watchlist
      </button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">
        Mark as watched
      </button>
      <button class="film-card__controls-item button film-card__controls-item--favorite">
        Mark as favorite
      </button>
      </form>
    </article>`
  );
};

export default class FilmItem {
  constructor(task) {
    this._task = task;

    this._element = null;
  }

  getTemplate() {
    return createFilmItem(this._task);
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
