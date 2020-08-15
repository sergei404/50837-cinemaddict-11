import FilterComponent from './components/filter.js';
import ContentComponent from './components/content-template.js';
import ProfileComponent from './components/profile.js';
import StatisticsComponent from './components/statictics.js';
import PageController from "./controllers/page.js";

import {generateItems} from "./mock/film-item.js";
// import {generateFilters} from './mock/filter.js';
import {render, RenderPosition} from "./utils/render.js";

const COUNT_ITEMS = 20;

const items = generateItems(COUNT_ITEMS);
// const filters = generateFilters();


const main = document.querySelector(`.main`);
const header = document.querySelector(`.header`);
const statistic = document.querySelector(`.footer__statistics`);

// render(header, new ProfileComponent(filters), RenderPosition.BEFOREEND);
render(main, new FilterComponent(items), RenderPosition.BEFOREEND);

const contentComponent = new ContentComponent();
const pageController = new PageController(contentComponent);
render(main, contentComponent, RenderPosition.BEFOREEND);
pageController.render(items);

render(statistic, new StatisticsComponent(items.length), RenderPosition.BEFOREEND);
