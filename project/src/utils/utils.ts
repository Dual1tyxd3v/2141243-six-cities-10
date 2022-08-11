import { Offers } from '../types/offer';

export const groupByCity = (offersOriginal: Offers) => {
  const offers = Object.fromEntries(offersOriginal.map((m) =>
    [m.city.name, offersOriginal.filter((it) => it.city.name === m.city.name)]));

  const offersGrouped = Object.entries(offers);

  return offersGrouped;
};
