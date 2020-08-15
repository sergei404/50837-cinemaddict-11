import FilmItemComponent from '../components/film-item.js';
import PopupComponent from '../components/popup.js';
import {render, replace, RenderPosition} from "../utils/render.js";

export default class MovieController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;

    this._filmComponent = null;
    this._popupComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(item) {
    this._filmComponent = new FilmItemComponent(item);
    this._popupComponent = new PopupComponent(item);

    this._filmComponent.setFilmHandler((evt) => {
      this._replaceFilmToPopup(evt);
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._filmComponent.setWatchlistButtonClickHandler(() => {
      this._isWatchlistChange(item);
    });

    this._filmComponent.setWatchedButtonClickHandler(() => {
      this._isWatchedChange(item);
    });

    this._filmComponent.setFavoriteButtonClickHandler(() => {
      this._isFavoriteChange(item);
    });

    this._popupComponent.setWatchlistButtonClickHandler(() => {
      this._isWatchlistChange(item);
    });

    this._popupComponent.setWatchedButtonClickHandler(() => {
      this._isWatchedChange(item);
    });

    this._popupComponent.setFavoriteButtonClickHandler(() => {
      this._isFavoriteChange(item);
    });


    this._popupComponent.setPopupHandler(() => {
      this._replacePopupToFilm();
    });

    render(this._container, this._filmComponent, RenderPosition.BEFOREEND);
  }

  _replaceFilmToPopup(evt) {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    const evtTarget = evt.target;
    if (evtTarget.classList.contains(`film-card__poster`) || evtTarget.classList.contains(`film-card__title`) || evtTarget.classList.contains(`film-card__rating`)) {
      replace(this._popupComponent, this._filmComponent);
    }
  }

  _replacePopupToFilm() {
    replace(this._filmComponent, this._popupComponent);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      this._replacePopupToFilm();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  _isWatchlistChange(item) {
    return this._onDataChange(this, item, Object.assign({}, item, {
      "user_details": {
        "already_watched": item.user_details.already_watched,
        "favorite": item.user_details.favorite,
        "personal_rating": item.user_details.personal_rating,
        "watching_date": item.user_details.watching_date,
        "watchlist": !item.user_details.watchlist,
      }
    }));
  }

  _isWatchedChange(item) {
    return this._onDataChange(this, item, Object.assign({}, item, {
      "user_details": {
        "already_watched": !item.user_details.already_watched,
        "favorite": item.user_details.favorite,
        "personal_rating": item.user_details.personal_rating,
        "watching_date": item.user_details.watching_date,
        "watchlist": item.user_details.watchlist,
      }
    }));
  }

  _isFavoriteChange(item) {
    return this._onDataChange(this, item, Object.assign({}, item, {
      "user_details": {
        "already_watched": item.user_details.already_watched,
        "favorite": !item.user_details.favorite,
        "personal_rating": item.user_details.personal_rating,
        "watching_date": item.user_details.watching_date,
        "watchlist": item.user_details.watchlist,
      }
    }));
  }
}

