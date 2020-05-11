import AbstractComponent from "./abstract-component.js";

const createExtraTemplates = () => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>
    </section>`
  );
};


export default class ExtraTemplate extends AbstractComponent {
  getTemplate() {
    return createExtraTemplates();
  }
}

