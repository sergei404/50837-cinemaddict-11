import FilterComponent from './components/filter.js'; // createFilterTemplate
import SortingComponent from './components/sorting.js'; // createSortTemplate
import ContentComponent from './components/content-template.js'; // createContentTemplate
import FilmItemComponent from './components/film-item.js'; // createFilmItem
import ButtonComponent from './components/button.js'; // createButton
import ProfileComponent from './components/profile.js'; // createProfileTemplate
import ExtraComponent from './components/extra-template.js'; // createExtraTemplates
import StatisticsComponent from './components/statictics.js'; // createStatisticsTemplate
import PopupComponent from './components/popup.js'; // createPopupTemplate
import PopupFilmComponent from './components/film-popup.js'; // createPopupFilmTemplate
import PopupCommentsComponent from './components/film-comments-popup.js'; // createPopupCommentsTemplate
import FilmsComponent from "./components/films.js";

// mock
import {generateItems} from "./mock/film-item.js";
import {generateFilters} from './mock/filter.js';
import {render, RenderPosition} from "./utils.js";

const COUNT_ITEMS = 20;
const COUNT_TOP_AND_COMMENTED = 2;
const SHOWING_TASKS_COUNT_ON_START = 5;
const SHOWING_TASKS_COUNT_BY_BUTTON = 5;
const main = document.querySelector(`.main`);

const renderFilm = (filmElement, item) => {
  const onEditButtonClick = (evt) => {
    if (document.querySelector(`.film-details`)) {
      popupComponent.getElement().remove();
      popupComponent.removeElement();
    }
    const evtTarget = evt.target.getAttribute(`class`);
    if (evtTarget === `film-card__poster` || evtTarget === `film-card__title` || evtTarget === `film-card__rating`) {
      filmElement.replaceChild(popupComponent.getElement(), filmComponent.getElement());
    }
  };

  const onEditFormSubmit = () => {
    filmElement.replaceChild(filmComponent.getElement(), popupComponent.getElement());
  };

  const filmComponent = new FilmItemComponent(item);
  filmComponent.getElement().addEventListener(`click`, onEditButtonClick);

  const popupComponent = new PopupComponent();
  const closeBtn = popupComponent.getElement().querySelector(`.film-details__close-btn`);
  render(closeBtn.parentNode, new PopupFilmComponent(item).getElement(), RenderPosition.AFTEREND);
  const form = popupComponent.getElement().querySelector(`form`);
  render(form, new PopupCommentsComponent(item).getElement(), RenderPosition.BEFOREEND);

  render(filmElement, filmComponent.getElement(), RenderPosition.BEFOREEND);

  closeBtn.addEventListener(`click`, onEditFormSubmit);


  window.addEventListener(`keydown`, (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      onEditFormSubmit();
    }
  });
};

const renderBoard = (boardComponent, items) => {
  render(boardComponent.getElement(), new FilmsComponent().getElement(), RenderPosition.BEFOREEND);

  const filmElement = boardComponent.getElement().querySelector(`.films-list__container`);
  let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
  items.slice(0, showingTasksCount)
  .forEach((item) => {
    renderFilm(filmElement, item);
  });

  const moreButton = new ButtonComponent();
  render(boardComponent.getElement(), moreButton.getElement(), RenderPosition.BEFOREEND);

  moreButton.getElement().addEventListener(`click`, () => {
    const prevTasksCount = showingTasksCount;
    showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

    items.slice(prevTasksCount, showingTasksCount)
      .forEach((item) => renderFilm(filmElement, item));

    if (showingTasksCount >= items.length) {
      moreButton.getElement().remove();
      moreButton.removeElement();
    }
  });
  const extraComponent = new ExtraComponent();
  const extra = [...extraComponent.getElement()];
  extra.forEach((it) => render(boardComponent.getElement(), it, RenderPosition.BEFOREEND));

  const topTemplate = extra[0];
  const commentedTemplate = extra[1];

  items.slice().sort((prev, next)=> next[`film_info`][`total_rating`] - prev[`film_info`][`total_rating`]).slice(0, COUNT_TOP_AND_COMMENTED)
  .forEach((item) => {
    renderFilm(topTemplate, item);
  });

  items.slice().sort((prev, next)=> next.comments.length - prev.comments.length).slice(0, COUNT_TOP_AND_COMMENTED)
  .forEach((item) => renderFilm(commentedTemplate, item));
};

const filters = generateFilters();
const items = generateItems(COUNT_ITEMS);


const header = document.querySelector(`.header`);
const statistic = document.querySelector(`.footer__statistics`);

render(header, new ProfileComponent(filters).getElement(), RenderPosition.BEFOREEND);
render(main, new FilterComponent(filters).getElement(), RenderPosition.BEFOREEND);
render(main, new SortingComponent().getElement(), RenderPosition.BEFOREEND);

const contentComponent = new ContentComponent();
render(main, contentComponent.getElement(), RenderPosition.BEFOREEND);
renderBoard(contentComponent, items);

render(statistic, new StatisticsComponent(items.length).getElement(), RenderPosition.BEFOREEND);


// render(main, createContentTemplate());


// const content = document.querySelector(`.films`);
// const filmList = content.querySelector(`.films-list__container`);

// let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
// items.slice(0, showingTasksCount)
//   .forEach((item) => render(filmList, createFilmItem(item)));

// render(filmList, createButton(), `afterend`);
// const moreButton = content.querySelector(`.films-list__show-more`);

// moreButton.addEventListener(`click`, () => {
//   const prevTasksCount = showingTasksCount;
//   showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

//   items.slice(prevTasksCount, showingTasksCount)
//     .forEach((item) => render(filmList, createFilmItem(item)));

//   if (showingTasksCount >= items.length) {
//     moreButton.remove();
//   }
// });

// const extraTemplates = createExtraTemplates();
// extraTemplates.forEach((it) => render(content, it));

// const topTemplate = document.querySelector(`.films-list--extra .films-list__container`);
// items.slice().sort((prev, next)=> next[`film_info`][`total_rating`] - prev[`film_info`][`total_rating`]).slice(0, COUNT_TOP_AND_COMMENTED)
//   .forEach((item) => render(topTemplate, createFilmItem(item)));

// const commentedTemplate = document.querySelector(`.films-list--extra:last-of-type .films-list__container`);
// items.slice().sort((prev, next)=> next.comments.length - prev.comments.length).slice(0, COUNT_TOP_AND_COMMENTED)
//   .forEach((item) => render(commentedTemplate, createFilmItem(item)));

// const statistic = document.querySelector(`.footer__statistics`);
// render(statistic, createStatisticsTemplate(items.length));
// const footer = document.querySelector(`.footer`);

// const popupRander = (evt) => {
//   if (document.querySelector(`.film-details`)) {
//     document.querySelector(`.film-details`).remove();
//   }
//   const evtTarget = evt.target.getAttribute(`class`)
//   if (evtTarget === `film-card__poster` || evtTarget === `film-card__title` || evtTarget === `film-card__rating`) {
//     render(footer, createPopupTemplate(), `afterend`);
//   }
//   const popup = document.querySelector(`.film-details`);
//   const closeBtn = popup.querySelector(`.film-details__close-btn`);
//   render(closeBtn.parentNode, createPopupFilmTemplate(items[0]), `afterend`);
//   const form = popup.querySelector(`form`);
//   render(form, createPopupCommentsTemplate(items[0]));

//   closeBtn.addEventListener(`click`, () => {
//     popup.remove();
//   });

//   window.addEventListener(`keydown`, (event) => {
//     if (event.keyCode === ESC_KEYCODE) {
//       popup.remove();
//     }
//   });
// };
// content.addEventListener(`click`, popupRander);
