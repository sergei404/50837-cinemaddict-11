import {getRandomNumber, getRandomRating, getRandomArrayItem, shuffle} from '../utils.js';

const posters = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-man-with-the-golden-arm.jpg`
];

const descriptions = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`.split(`. `).map((it) => (it.replace(`.`, ``)));

const generateComment = () => {
  return {
    "id": ``,
    "author": `Ilya O'Reilly`,
    "comment": `a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.`,
    "date": `2019-05-11T16:12:32.554Z`,
    "emotion": `neutral-face`
  };
};

const generateComments = (count) => {
  return new Array(count)
      .fill(` `)
      .map(generateComment);
};

const generateItem = () => {
  const date = [new Date(1255924187819).getDate(), new Date(1255924187819).toLocaleString(`en`, {month: `long`}), new Date(1255924187819).getFullYear()];
  let poster = getRandomArrayItem(posters);
  const title = poster.slice(0, poster.indexOf(`.`)).replace(/-/g, ` `);
  const description = shuffle(descriptions).slice(0, getRandomNumber(1, 5)).join(`. `);
  let runtime = getRandomNumber(61, 119);

  return {
    "id": ``,
    "comments": generateComments(getRandomNumber(0, 5)),
    "film_info": {
      "title": title,
      "alternative_title": `Laziness Who Sold Themselves`,
      "total_rating": getRandomRating(3, 10),
      "poster": poster,
      "age_rating": 0,
      "director": `Tom Ford`,
      "writers": [
        `Takeshi Kitano`
      ].join(` `),
      "actors": [
        `Morgan Freeman`
      ].join(` `),
      "release": {
        "date": date.join(` `),
        "release_country": `Finland`
      },
      "runtime": `${Math.floor(runtime / 60)}h ${runtime % 60}min`,
      "genre": [
        `Comedy`
      ],
      "description": description.length > 140 ? description.slice(0, 139) + `…` : description + `.`,
    },
    "user_details": {
      "personal_rating": getRandomNumber(0, 18),
      "watchlist": false,
      "already_watched": true,
      "watching_date": `2019-05-11T16:12:32.554Z`,
      "favorite": false
    }
  };
};


const generateItems = (count) => {
  return new Array(count)
    .fill(` `)
    .map(generateItem);
};

export {generateItem, generateItems};
