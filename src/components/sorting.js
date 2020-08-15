import AbstractComponent from "./abstract-component.js";

export const SortType = {
  RATING: `rating`,
  DATE: `date`,
  COMMENTED: `comented`,
  DEFAULT: `default`,
};

const createSortingTemplate = () => {
  return (
    `<ul class="sort">
      <li>
        <a href="#" data-sort-type="${SortType.DEFAULT}" class="sort__button sort__button--active">Sort by default</a>
      </li>
      <li>
        <a href="#" data-sort-type="${SortType.DATE}" class="sort__button">Sort by date</a>
      </li>
      <li>
        <a href="#" data-sort-type="${SortType.RATING}" class="sort__button">Sort by rating</a>
      </li>
    </ul>`
  );
};

export default class Sort extends AbstractComponent {
  constructor() {
    super();

    this._currenSortType = SortType.DEFAULT;
  }

  getTemplate() {
    return createSortingTemplate();
  }

  getSortType() {
    return this._currenSortType;
  }


  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;
      [...this.getElement().querySelectorAll(`.sort__button`)].forEach((el) => {
        el.classList.remove(`sort__button--active`);
        if (el === evt.target) {
          el.classList.add(`sort__button--active`);
        }
      });

      if (this._currenSortType === sortType) {
        return;
      }

      this._currenSortType = sortType;

      handler(this._currenSortType);

    });
  }
}
