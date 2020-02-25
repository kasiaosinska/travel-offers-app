import { ADD_OFFERS } from './action';

const initialState = {
  offers: [],
};

export default (state = initialState, action) => {
  if (action.type === ADD_OFFERS) {
    return { ...state, offers: [ ...state.offers, ...action.newOffers]};
  } else {
    return state;
  }
};
