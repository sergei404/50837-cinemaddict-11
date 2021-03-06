import {EMOJIS} from '../const.js';
import AbstractComponent from "./abstract-component.js";

const filmCommentMarkup = (comments) => {
  return comments
    .map((comment) => {
      return (
        `<li class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-${comment.emotion}">
        </span>
        <div>
          <p class="film-details__comment-text">${comment.comment}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${comment.author}</span>
            <span class="film-details__comment-day">${comment.date}</span>
            <button class="film-details__comment-delete">Delete</button>
          </p>
        </div>
      </li>`
      );
    }).join(`\n`);
};

const newFilmCommentMarkup = (emojis) => {
  return emojis
    .map((emoji) => {
      return (
        `<input class="film-details__emoji-item
          visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}">
        <label class="film-details__emoji-label" for="emoji-${emoji}">
          <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="${emoji}">
        </label>`
      );
    }).join(`\n`);
};

const createPopupCommentsTemplate = (item) => {
  const {comments} = item;

  const comment = filmCommentMarkup(comments);
  const emojis = newFilmCommentMarkup(EMOJIS);
  return (
    `<div class="form-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
        <ul class="film-details__comments-list">
          ${comment}
        </ul>
        <div class="film-details__new-comment">
          <div for="add-emoji" class="film-details__add-emoji-label"></div>
          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>
          <div class="film-details__emoji-list">
            ${emojis}
          </div>
        </section>
      </di>
    </div> `
  );
};

export default class PopupFilm extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createPopupCommentsTemplate(this._filters);
  }
}
