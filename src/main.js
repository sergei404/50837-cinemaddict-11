import FilterComponent from './components/filter.js'; // createFilterTemplate
import SortingComponent from './components/sorting.js'; // createSortTemplate
import ContentComponent from './components/content-template.js'; // createContentTemplate
import FilmItemComponent from './components/film-item.js'; // createFilmItem
import ButtonComponent from './components/button.js'; // createButton
import ProfileComponent from './components/profile.js'; // createProfileTemplate
import ExtraTopComponent from './components/extra-top.js'; // createExtraTemplates
import ExtraCommentedComponent from './components/extra-commented.js'; // createCommentedTemplates
import StatisticsComponent from './components/statictics.js'; // createStatisticsTemplate
import PopupComponent from './components/popup.js'; // createPopupTemplate
import PopupFilmComponent from './components/film-popup.js'; // createPopupFilmTemplate
import PopupCommentsComponent from './components/film-comments-popup.js'; // createPopupCommentsTemplate
import FilmsComponent from "./components/films.js";
import NoFilmsComponent from "./components/no-films.js";

// mock
import {generateItems} from "./mock/film-item.js";
import {generateFilters} from './mock/filter.js';
import {render, remove, replace, RenderPosition} from "./utils/render.js";

const COUNT_ITEMS = 20;
const COUNT_TOP_AND_COMMENTED = 2;
const SHOWING_TASKS_COUNT_ON_START = 5;
const SHOWING_TASKS_COUNT_BY_BUTTON = 5;
const main = document.querySelector(`.main`);

const renderFilm = (filmElement, item) => {
  const replaceFilmToPopup = (evt) => {
    if (document.querySelector(`.film-details`)) {
      remove(popupComponent);
    }
    // console.log(evt.target);
    // console.log(evt.currentTarget);
    const evtTarget = evt.target;
    if (evtTarget.classList.contains(`film-card__poster`) || evtTarget.classList.contains(`film-card__title`) || evtTarget.classList.contains(`film-card__rating`)) {
      replace(filmElement, popupComponent.getElement(), filmComponent.getElement());
    }
  };

  const replacePopupToFilm = () => {
    replace(filmElement, filmComponent.getElement(), popupComponent.getElement());
  };

  // const onEscKeyDown = (evt) => {
  document.addEventListener(`keydown`, (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replacePopupToFilm();
      // document.removeEventListener(`keydown`, onEscKeyDown);
    }
  });

  const filmComponent = new FilmItemComponent(item);
  render(filmElement, filmComponent, RenderPosition.BEFOREEND);

  const popupComponent = new PopupComponent();
  const popupFilm = new PopupFilmComponent(item);
  const popupComments = new PopupCommentsComponent(item);
  const form = popupComponent.getElement().querySelector(`form`);
  render(form, popupFilm, RenderPosition.BEFOREEND);
  render(form, popupComments, RenderPosition.BEFOREEND);

  // filmComponent.getElement().addEventListener(`click`, replaceFilmToPopup);

  // const closeBtn = popupComponent.getElement().querySelector(`.film-details__close-btn`);
  // closeBtn.addEventListener(`click`, replacePopupToFilm);

  filmComponent.setFilmHandler(() => {
    replaceFilmToPopup();
    // document.addEventListener(`keydown`, onEscKeyDown);
  });

  popupComponent.setPopupHandler((evt) => {
    evt.preventDefault();
    replacePopupToFilm();
    // document.removeEventListener(`keydown`, onEscKeyDown);
  });


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

const filters = generateFilters();
const items = generateItems(COUNT_ITEMS);


const header = document.querySelector(`.header`);
const statistic = document.querySelector(`.footer__statistics`);

render(header, new ProfileComponent(filters), RenderPosition.BEFOREEND);
render(main, new FilterComponent(filters), RenderPosition.BEFOREEND);
render(main, new SortingComponent(), RenderPosition.BEFOREEND);

const contentComponent = new ContentComponent();
render(main, contentComponent, RenderPosition.BEFOREEND);
renderBoard(contentComponent, items);

render(statistic, new StatisticsComponent(items.length), RenderPosition.BEFOREEND);
