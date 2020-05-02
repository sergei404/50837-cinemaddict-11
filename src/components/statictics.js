import {createElement} from "../utils.js";

const createStatisticsTemplate = (movies) => {
  return (
    `<p>${movies} movies inside</p>`
  );
};

export default class Statistic {
  constructor(movies) {
    this._movies = movies;
    this._element = null;
  }

  getTemplate() {
    return createStatisticsTemplate(this._movies);
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
