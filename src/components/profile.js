import {userRank} from '../const.js';


const profileMarkup = (filter, ranks) => {
  return ranks
    .map((rank) => {
      return (
        `<p class="profile__rating">${rank.rank}</p>
        <img class="profile__avatar" src="images/${rank.src}" alt="Avatar">`
      );
    }).join(`\n`);
};


export const createProfileTemplate = (filter) => {
  const userProfile = profileMarkup(filter, userRank);

  return (
    `<section class="header__profile profile">
      ${userProfile}
    </section>`
  );
};

