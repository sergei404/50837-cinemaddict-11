import AbstractComponent from "./abstract-component.js";

const filterNames = [
  `All movies`,
  `Watchlist`,
  `History`,
  `Favorites`
];

const generateFilters = (items) => {
  
  return filterNames.map((it) => {
    return {
      name: it,
      //count: Math.floor(Math.random() * 25),
    };
  });
};


const createFilterMarkup = (filter, isActive) => {
  const {name, count} = filter;

  return (
    `<a href="#all" class="main-navigation__item ${isActive ? `main-navigation__item--active` : ``}">
      ${name}
      ${!isActive ? `<span class="main-navigation__item-count">${count}</span>` : ``}
    </a>`
  );
};


const createFilterTemplate = (items) => {
  const filtersMarkup = generateFilters(items).map((it, i) => createFilterMarkup(it, i === 0)).join(`\n`);

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

export default class Filter extends AbstractComponent {
  constructor(items) {
    super();
    this._items = items;
  }

  getTemplate() {
    return createFilterTemplate(this._items);
  }
}

