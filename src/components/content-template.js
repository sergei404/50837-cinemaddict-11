import AbstractComponent from "./abstract-component.js";

const createContentTemplate = () => {
  return (
    `<section class="films">
      <section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      </section>
    </section`
  );
};

export default class ContentTemplate extends AbstractComponent {
  getTemplate() {
    return createContentTemplate();
  }

}
