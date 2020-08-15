import MovieController from "./movie.js";
import ButtonComponent from '../components/button.js';
import ExtraTopComponent from '../components/extra-top.js';
import ExtraCommentedComponent from '../components/extra-commented.js';
import FilmsComponent from "../components/films.js";
import NoFilmsComponent from "../components/no-films.js";
import SortingComponent, {SortType} from '../components/sorting.js';
import {render, remove, RenderPosition} from "../utils/render.js";

const COUNT_TOP_AND_COMMENTED = 2;
const SHOWING_TASKS_COUNT_ON_START = 5;
const SHOWING_TASKS_COUNT_BY_BUTTON = 5;

const renderFilms = (filmElement, items, onDataChange) => {
  return items.map((item) => {
    const moveController = new MovieController(filmElement, onDataChange);

    moveController.render(item);

    return moveController;
  });
};


const getSortedFilms = (items, sortType, from, to) => {
  let sortedItems = [];
  const showingItema = items.slice();

  switch (sortType) {
    case SortType.RATING:
      sortedItems = showingItema.sort((prev, next) => next[`film_info`][`total_rating`] - prev[`film_info`][`total_rating`]);
      break;
    case SortType.DATE:
      sortedItems = showingItema.sort((prev, next) => Date.parse(prev.film_info.release.date) - Date.parse(next.film_info.release.date));
      break;
    case SortType.COMMENTED:
      sortedItems = showingItema.sort((prev, next)=> next.comments.length - prev.comments.length);
      break;
    case SortType.DEFAULT:
      sortedItems = showingItema;
      break;
  }
  return sortedItems.slice(from, to);
};

export default class BoardController {
  constructor(container) {
    this._container = container;

    this._items = [];
    this._showedFilmControllers = [];
    this._showingFilmsCount = SHOWING_TASKS_COUNT_ON_START;
    this._noFilmsComponent = new NoFilmsComponent();
    this._extraTopComponent = new ExtraTopComponent();
    this._extraCommentedComponent = new ExtraCommentedComponent();
    this._filmsComponent = new FilmsComponent();
    this._moreButtonComponent = new ButtonComponent();
    this._sortComponent = new SortingComponent();

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render(items) {
    this._items = items;
    const container = this._container.getElement();

    if (!items.length) {
      container.querySelector(`.films-list__title`).replaceWith(new NoFilmsComponent().getElement());
      return;
    }

    render(container.children[0], this._filmsComponent, RenderPosition.BEFOREEND);
    render(container, this._sortComponent, RenderPosition.BEFOREBEGIN);

    const filmList = this._filmsComponent.getElement();

    const newFilms = renderFilms(filmList, this._items.slice(0, this._showingFilmsCount), this._onDataChange);
    this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);

    this._renderMoreButton();

    render(container, this._extraTopComponent, RenderPosition.BEFOREEND);
    render(this._extraTopComponent.getElement(), new FilmsComponent(), RenderPosition.BEFOREEND);
    const topTemplate = this._extraTopComponent.getElement().querySelector(`.films-list__container`);
    const sortedItemsTop = getSortedFilms(items, SortType.RATING, 0, COUNT_TOP_AND_COMMENTED);
    renderFilms(topTemplate, sortedItemsTop, this._onDataChange);


    render(container, this._extraCommentedComponent, RenderPosition.BEFOREEND);
    render(this._extraCommentedComponent.getElement(), new FilmsComponent(), RenderPosition.BEFOREEND);
    const commentedTemplate = this._extraCommentedComponent.getElement().querySelector(`.films-list__container`);
    const sortedItemsCommeneted = getSortedFilms(items, SortType.COMMENTED, 0, COUNT_TOP_AND_COMMENTED);
    renderFilms(commentedTemplate, sortedItemsCommeneted, this._onDataChange);
  }

  _renderMoreButton() {
    if (this._showingFilmsCount >= this._items.length) {
      return;
    }
    const container = this._container.getElement();

    render(container.children[0], this._moreButtonComponent, RenderPosition.BEFOREEND);

    this._moreButtonComponent.setClickHandler(() => {
      const prevFilmsCount = this._showingFilmsCount;
      const filmList = this._filmsComponent.getElement();
      this._showingFilmsCount = this._showingFilmsCount + SHOWING_TASKS_COUNT_BY_BUTTON;

      const sortedFilms = getSortedFilms(this._items, this._sortComponent.getSortType(), prevFilmsCount, this._showingFilmsCount);
      const newFilms = renderFilms(filmList, sortedFilms, this._onDataChange);

      this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);

      if (this._showingFilmsCount >= this._items.length) {
        remove(this._moreButtonComponent);
      }
    });
  }

  _onDataChange(filmController, oldData, newData) {
    const index = this._items.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._items = [].concat(this._items.slice(0, index), newData, this._items.slice(index + 1));

    filmController.render(this._items[index]);
    console.log(this._items[index])
  }

  _onSortTypeChange(sortType) {
    this._showingFilmsCount = SHOWING_TASKS_COUNT_BY_BUTTON;

    const sortedItems = getSortedFilms(this._items, sortType, 0, this._showingFilmsCount);
    const filmList = this._filmsComponent.getElement()

    filmList.innerHTML = ``;

    renderFilms(filmList, sortedItems, this._onDataChange);
    this._renderMoreButton();
  }

}
