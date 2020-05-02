import {userRank} from '../const.js';
import {createElement} from "../utils.js";

const profileMarkup = (ranks) => {
  return ranks
    .map((rank) => {
      return (
        `<p class="profile__rating">${rank.rank}</p>
        <img class="profile__avatar" src="images/${rank.src}" alt="Avatar">`
      );
    });
};

function getProfile(num, arr) {
  let user = ``;
  if (num >= 21) {
    user = arr.find((el) => el.includes(`movie buff`));
  } else if (num < 21 && num >= 11) {
    user = arr.find((el) => el.includes(`fan`));;
  } else if (num < 11 && num >= 1) {
    user = arr.find((el) => el.includes(`novice`));;
  }
  return user;
}

const createProfileTemplate = (filter) => {
  const filt = filter.find((el) => {
    return el.name === `History`;
  });
  const user = getProfile(filt.count, profileMarkup(userRank));

  return (
    `<section class="header__profile profile">
      ${user}
    </section>`
  );
};

export default class Profile {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return createProfileTemplate(this._filters);
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

