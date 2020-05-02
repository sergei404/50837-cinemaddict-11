import {sectionTitles} from '../const.js';
import {createElement} from "../utils.js";

const titleMarkup = (titles) => {
  return titles
    .map((title) => {
      return (
        `<section class="films-list--extra">
          <h2 class="films-list__title">${title}</h2>
        </section>`
      );
    }).join(`\n`);
};


const createExtraTemplates = () => {
  const sections = titleMarkup(sectionTitles);
  return sections;
};


export default class ExtraTemplate {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createExtraTemplates();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate(), true);
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
