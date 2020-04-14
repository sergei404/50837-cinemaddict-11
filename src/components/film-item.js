import {contolNames} from '../const.js';

const controlMarkup = (controls) => {
  return controls
    .map((control) => {
      return (
        `<button class="film-card__controls-item button film-card__controls-item--${control.toLowerCase().replace(/ /g, `-`)}">${control}</button>`
      );
    }).join(`\n`);
};

export const createFilmItem = (item) => {
  const {comments, "film_info": info} = item;

  const control = controlMarkup(contolNames);

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${info.title}</h3>
      <p class="film-card__rating">${info.total_rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${info.release.date}</span>
        <span class="film-card__duration">${info.runtime}</span>
        <span class="film-card__genre">${info.genre[0]}</span>
      </p>
      <img src="./images/posters/${info.poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${info.description}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <form class="film-card__controls">
        ${control}
      </form>
    </article>`
  );
};

