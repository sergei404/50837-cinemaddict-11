import {createElement} from '../utils.js';

const createFilterMarkup = (filter, isActive) => {
  const {name, count} = filter;

  return (
    `<a href="#all" class="main-navigation__item ${isActive ? `main-navigation__item--active` : ``}">
      ${name}
      ${!isActive ? `<span class="main-navigation__item-count">${count}</span>` : ``}
    </a>`
  );
};


const createFilterTemplate = (filters) => {
  const filtersMarkup = filters.map((it, i) => createFilterMarkup(it, i === 0)).join(`\n`);

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${filtersMarkup}
      </div>
      <a href="#stats" class="main-navigation__additional">
        Stats
      </a>
    </nav>`
  );
};

export default class Filter {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
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
