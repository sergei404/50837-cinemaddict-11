import {createMenu} from './components/memu.js';
import {createFilterTemplate} from './components/filter-template.js';
import {createContentTemplate} from './components/content-template.js';
import {createFilmItem} from './components/film-item.js';
import {createButton} from './components/button.js';
import {createProfileTemplate} from './components/profile.js';
import {createExtraTemplate} from './components/extra-template.js';
import {createStatisticsTemplate} from './components/statictics.js';
import {createPopupTemplate} from './components/popup.js';

const COUNT_ITEM = 5;
const COUNT_TOP_AND_COMMENTED = 2;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const header = document.querySelector(`.header`);
render(header, createProfileTemplate());

const main = document.querySelector(`.main`);
render(main, createMenu());
render(main, createFilterTemplate());
render(main, createContentTemplate());

const content = document.querySelector(`.films`);
const filmList = content.querySelector(`.films-list__container`);

function getRenderTemplate(count, feild, item) {
  new Array(count)
  .fill(` `)
  .forEach(() => render(feild, item));
}

getRenderTemplate(COUNT_ITEM, filmList, createFilmItem());
render(filmList, createButton(), `afterend`);


getRenderTemplate(COUNT_TOP_AND_COMMENTED, content, createExtraTemplate());

const topTemplate = document.querySelector(`.films-list--extra .films-list__container`);
getRenderTemplate(COUNT_TOP_AND_COMMENTED, topTemplate, createFilmItem());

const commentedTemplate = document.querySelector(`.films-list--extra:last-of-type .films-list__container`);
getRenderTemplate(COUNT_TOP_AND_COMMENTED, commentedTemplate, createFilmItem());

const statistic = document.querySelector(`.footer__statistics`);
render(statistic, createStatisticsTemplate());

render(document.body, createPopupTemplate());
const popup = document.querySelector(`.film-details`);
const buttonPopupClose = popup.querySelector(`.film-details__close-btn`);

buttonPopupClose.addEventListener(`click`, () => {
  popup.remove();
}, {once: true});
