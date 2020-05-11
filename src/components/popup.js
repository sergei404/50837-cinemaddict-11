import AbstractComponent from "./abstract-component.js";

const createPopupTemplate = () => {
  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
      </form>
    </section>`
  );
};

export default class Popup extends AbstractComponent {
  getTemplate() {
    return createPopupTemplate();
  }

  // setSubmitHandler(handler) {
  //   this.getElement().querySelector(`.film-details__close-btn`)
  //     .addEventListener(`click`, handler);
  // }
}

