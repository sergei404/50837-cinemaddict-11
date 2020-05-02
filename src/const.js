export const controlNames = [
  {
    name: `watchlist`,
    text: `Add to watchlist`
  },
  {
    name: `watched`,
    text: `Already watched`,
  },
  {
    name: `favorite`,
    text: `Add to favorites`,
  }
];

export const userRank = [
  {
    rank: `novice`,
    src: `bitmap.png`
  },
  {
    rank: `fan`,
    src: `bitmap@2x.png`
  },
  {
    rank: `movie buff`,
    src: `bitmap@3x.png`
  }
];

export const sectionTitles = [`Top rated`, `Most commented`];

const filterNames = [
  `All movies`,
  `Watchlist`,
  `History`,
  `Favorites`
];

export const generateFilters = () => {
  return filterNames.map((it) => {
    return {
      name: it,
      count: Math.floor(Math.random() * 15),
    };
  });
};

export const EMOJIS = [`smile`, `sleeping`, `puke`, `angry`];

export const GENRES =  [`Comedy`, `Drama`, `Film-Noir`, `Mystery`, `Action`, `Western`, `Detective`];
