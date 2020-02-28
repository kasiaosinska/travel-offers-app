export const LOAD_OFFERS = 'LOAD_OFFERS';

export const loadOffers = newOffers => {
  return { type: LOAD_OFFERS, newOffers };
};
