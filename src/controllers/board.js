import FilmItemComponent from '../components/film-item.js'; // createFilmItem
import ButtonComponent from '../components/button.js'; // createButton
import ExtraTopComponent from '../components/extra-top.js'; // createExtraTemplates
import ExtraCommentedComponent from '../components/extra-commented.js'; // createCommentedTemplates
import PopupComponent from '../components/popup.js'; // createPopupTemplate
import FilmsComponent from "../components/films.js";
import NoFilmsComponent from "../components/no-films.js";


import {render, remove, replace, RenderPosition} from "../utils/render.js";

const COUNT_TOP_AND_COMMENTED = 2;
const SHOWING_TASKS_COUNT_ON_START = 5;
const SHOWING_TASKS_COUNT_BY_BUTTON = 5;

const renderFilm = (filmElement, item) => {
  const replaceFilmToPopup = (evt) => {
    // if (document.querySelector(`film-details`)) {
    //   remove(popupComponent);
    // }
    const evtTarget = evt.target;
    if (evtTarget.classList.contains(`film-card__poster`) || evtTarget.classList.contains(`film-card__title`) || evtTarget.classList.contains(`film-card__rating`)) {
      replace(popupComponent, filmComponent);
    }
  };

  const replacePopupToFilm = () => {
    replace(filmComponent, popupComponent);
  };

  const filmComponent = new FilmItemComponent(item);
  const popupComponent = new PopupComponent(item);

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      replacePopupToFilm();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  filmComponent.setFilmHandler((evt) => {
    replaceFilmToPopup(evt);
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  popupComponent.setPopupHandler(() => {
    replacePopupToFilm();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(filmElement, filmComponent, RenderPosition.BEFOREEND);
};

const renderBoard = (boardComponent, items) => {
  if (!items.length) {
    boardComponent.getElement().querySelector(`.films-list__title`).replaceWith(new NoFilmsComponent().getElement());
    return;
  }
  const boardChildComponent = boardComponent.getElement().querySelector(`.films-list`);
  render(boardChildComponent, new FilmsComponent(), RenderPosition.BEFOREEND);

  const filmElement = boardComponent.getElement().querySelector(`.films-list__container`);
  let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
  items.slice(0, showingTasksCount)
  .forEach((item) => {
    renderFilm(filmElement, item);
  });

  const moreButton = new ButtonComponent();
  render(boardChildComponent, moreButton, RenderPosition.BEFOREEND);

  moreButton.setClickHandler(() => {
    const prevTasksCount = showingTasksCount;
    showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

    items.slice(prevTasksCount, showingTasksCount)
      .forEach((item) => renderFilm(filmElement, item));

    if (showingTasksCount >= items.length) {
      remove(moreButton);
    }
  });

  const extraTop = new ExtraTopComponent();
  render(boardComponent.getElement(), extraTop, RenderPosition.BEFOREEND);
  render(extraTop.getElement(), new FilmsComponent(), RenderPosition.BEFOREEND);
  const topTemplate = extraTop.getElement().querySelector(`.films-list__container`);
  items.slice().sort((prev, next)=> next[`film_info`][`total_rating`] - prev[`film_info`][`total_rating`]).slice(0, COUNT_TOP_AND_COMMENTED)
  .forEach((item) => {
    renderFilm(topTemplate, item);
  });

  const extraCommented = new ExtraCommentedComponent();
  render(boardComponent.getElement(), extraCommented, RenderPosition.BEFOREEND);
  render(extraCommented.getElement(), new FilmsComponent(), RenderPosition.BEFOREEND);
  const commentedTemplate = extraCommented.getElement().querySelector(`.films-list__container`);
  items.slice().sort((prev, next)=> next.comments.length - prev.comments.length).slice(0, COUNT_TOP_AND_COMMENTED)
  .forEach((item) => renderFilm(commentedTemplate, item));
};

export default class BoardController {
  constructor(container) {
    this._container = container;

    this._noFilmsComponent = new NoFilmsComponent();
    this._extraTopComponent = new ExtraTopComponent();
    this._extraCommentedComponent = new ExtraCommentedComponent();
    this._filmsComponent = new FilmsComponent();
    this._moreButtonComponent = new ButtonComponent();
  }

  render(items) {
    // const container = this._container.getElement();

    // if (!items.length) {
    //   render(container, this._noTasksComponent, RenderPosition.BEFOREEND);
    //   return;
    // }

    // render(container, this._filmsComponent, RenderPosition.BEFOREEND);
    // const filmElement = this._filmsComponent.getElement().querySelector(`.films-list__container`);
    // let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
    // items.slice(0, showingTasksCount)
    // .forEach((item) => {
    //   renderFilm(filmElement, item);
    // });

    // render(container, this._moreButtonComponent, RenderPosition.BEFOREEND);
    // this._moreButtonComponent.setClickHandler(() => {
    //   const prevTasksCount = showingTasksCount;
    //   showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

    //   items.slice(prevTasksCount, showingTasksCount)
    //     .forEach((item) => renderFilm(filmElement, item));

    //   if (showingTasksCount >= items.length) {
    //     remove(this._moreButtonComponent);
    //   }
    // });

    // render(container, this._extraTopComponent, RenderPosition.BEFOREEND);
    // render(this._extraTopComponent.getElement(), this._filmsComponent, RenderPosition.BEFOREEND);
    // const topTemplate = this._extraTopComponent.getElement().querySelector(`.films-list__container`);
    // items.slice().sort((prev, next)=> next[`film_info`][`total_rating`] - prev[`film_info`][`total_rating`]).slice(0, COUNT_TOP_AND_COMMENTED)
    // .forEach((item) => {
    //   renderFilm(topTemplate, item);
    // });

    // render(container, this._extraCommentedComponent, RenderPosition.BEFOREEND);
    // render(this._extraCommentedComponent.getElement(), new FilmsComponent(), RenderPosition.BEFOREEND);
    // const commentedTemplate = this._extraCommentedComponent.getElement().querySelector(`.films-list__container`);
    // items.slice().sort((prev, next)=> next.comments.length - prev.comments.length).slice(0, COUNT_TOP_AND_COMMENTED)
    //   .forEach((item) => renderFilm(commentedTemplate, item));
    renderBoard(this._container, items);
  }
  // renderBoard(this._container, tasks);
}
