import FilterComponent from './components/filter.js'; // createFilterTemplate
import ContentComponent from './components/content-template.js'; // createContentTemplate
import ProfileComponent from './components/profile.js'; // createProfileTemplate
import StatisticsComponent from './components/statictics.js'; // createStatisticsTemplate
import BoardController from "./controllers/board.js";
import SortingComponent from './components/sorting.js'; // createSortTemplate

// mock
import {generateItems} from "./mock/film-item.js";
import {generateFilters} from './mock/filter.js';
import {render, RenderPosition} from "./utils/render.js";

const COUNT_ITEMS = 20;

const filters = generateFilters();
const items = generateItems(COUNT_ITEMS);

const main = document.querySelector(`.main`);
const header = document.querySelector(`.header`);
const statistic = document.querySelector(`.footer__statistics`);

render(header, new ProfileComponent(filters), RenderPosition.BEFOREEND);
render(main, new FilterComponent(filters), RenderPosition.BEFOREEND);
render(main, new SortingComponent(), RenderPosition.BEFOREEND);

const contentComponent = new ContentComponent();
const boardController = new BoardController(contentComponent);
render(main, contentComponent, RenderPosition.BEFOREEND);
boardController.render(items);

render(statistic, new StatisticsComponent(items.length), RenderPosition.BEFOREEND);

