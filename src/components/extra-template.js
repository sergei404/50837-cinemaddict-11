import {sectionTitles} from '../const.js';

const titleMarkup = (titles) => {
  return titles
    .map((title) => {
      return (
        `<section class="films-list--extra">
          <h2 class="films-list__title">${title}</h2>

          <div class="films-list__container"></div
        </section>`
      );
    });
};


export const createExtraTemplates = () => {
  const titles = titleMarkup(sectionTitles);
  return titles;
};


