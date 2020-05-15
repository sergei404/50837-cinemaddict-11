import AbstractComponent from "./abstract-component.js";

const createStatisticsTemplate = (movies) => {
  return (
    `<p>${movies} movies inside</p>`
  );
};

export default class Statistic extends AbstractComponent {
  constructor(movies) {
    super();
    this._movies = movies;
  }

  getTemplate() {
    return createStatisticsTemplate(this._movies);
  }
}

