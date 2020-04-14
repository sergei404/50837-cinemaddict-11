// components
import {createFilterTemplate} from './components/filter.js';
import {createSortTemplate} from './components/sort.js';
import {createContentTemplate} from './components/content-template.js';
import {createFilmItem} from './components/film-item.js';
import {createButton} from './components/button.js';
import {createProfileTemplate} from './components/profile.js';
import {createExtraTemplates} from './components/extra-template.js';
import {createStatisticsTemplate} from './components/statictics.js';
import {createPopupTemplate} from './components/popup.js';

// mock
import {generateItems} from "./mock/film-item.js";
import {generateFilters} from './mock/filter.js';

const COUNT_ITEMS = 20;
const COUNT_TOP_AND_COMMENTED = 2;
const SHOWING_TASKS_COUNT_ON_START = 5;
const SHOWING_TASKS_COUNT_BY_BUTTON = 5;
const ESC_KEYCODE = 27;

// фунуция отрисовки компонентов
const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const filters = generateFilters();

const header = document.querySelector(`.header`);
render(header, createProfileTemplate(filters));

const main = document.querySelector(`.main`);
render(main, createFilterTemplate(filters));
render(main, createSortTemplate());
render(main, createContentTemplate());


const content = document.querySelector(`.films`);
const filmList = content.querySelector(`.films-list__container`);

const items = generateItems(COUNT_ITEMS);

let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
items.slice(0, showingTasksCount)
  .forEach((item) => render(filmList, createFilmItem(item)));

render(filmList, createButton(), `afterend`);
const moreButton = content.querySelector(`.films-list__show-more`);

moreButton.addEventListener(`click`, () => {
  const prevTasksCount = showingTasksCount;
  showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

  items.slice(prevTasksCount, showingTasksCount)
    .forEach((item) => render(filmList, createFilmItem(item)));

  if (showingTasksCount >= items.length) {
    moreButton.remove();
  }
});

const extraTemplates = createExtraTemplates();
extraTemplates.forEach((it) => render(content, it));

const topTemplate = document.querySelector(`.films-list--extra .films-list__container`);
items.slice().sort((prev, next)=> next[`film_info`][`total_rating`] - prev[`film_info`][`total_rating`]).slice(0, COUNT_TOP_AND_COMMENTED)
  .forEach((item) => render(topTemplate, createFilmItem(item)));

const commentedTemplate = document.querySelector(`.films-list--extra:last-of-type .films-list__container`);
items.slice().sort((prev, next)=> next.comments.length - prev.comments.length).slice(0, COUNT_TOP_AND_COMMENTED)
  .forEach((item) => render(commentedTemplate, createFilmItem(item)));

const statistic = document.querySelector(`.footer__statistics`);
render(statistic, createStatisticsTemplate(items.length));
const footer = document.querySelector(`.footer`);

const popupRander = (evt) => {
  if (document.querySelector(`.film-details`)) {
    document.querySelector(`.film-details`).remove();
  }
  if (evt.target.getAttribute(`class`) === `film-card__poster`) {
    render(footer, createPopupTemplate(items[0]), `afterend`);
  }
  let popup = document.querySelector(`.film-details`);

  document.querySelector(`.film-details__close-btn`).addEventListener(`click`, () => {
    popup.remove();
  });

  window.addEventListener(`keydown`, (event) => {
    if (event.keyCode === ESC_KEYCODE) {
      popup.remove();
    }
  });
  evt.preventDefault();
};

content.addEventListener(`click`, popupRander);


