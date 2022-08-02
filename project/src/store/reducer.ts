import { createReducer } from '@reduxjs/toolkit';
import { Comments, Offer, Offers } from '../types/offer';
import { changeCity, changeSortBy, loadOffers, setComments, setDataLoadStatus, setErrorMessage, setNearbyOffers, setOffer, setPostLoadStatus } from './action';

type InitialState = {
  city: string;
  offers: Offers;
  sortBy: string;
  isLoaded: boolean;
  error: string | null;
  nearbyOffers: Offers;
  comments: Comments;
  offer: Offer | null;
  postLoaded: boolean;
  postStatusCode: number;
}

const initialState: InitialState = {
  city: 'Paris',
  offers: [],
  sortBy: 'Popular',
  isLoaded: false,
  error: null,
  nearbyOffers: [],
  comments: [],
  offer: null,
  postLoaded: false,
  postStatusCode: 0,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload.city;
    })
    .addCase(changeSortBy, (state, action) => {
      state.sortBy = action.payload.sortBy;
    }).addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    }).addCase(setDataLoadStatus, (state, action) => {
      state.isLoaded = action.payload;
    }).addCase(setErrorMessage, (state, action) => {
      state.error = action.payload;
    }).addCase(setNearbyOffers, (state, action) => {
      state.nearbyOffers = action.payload;
    }).addCase(setComments, (state, action) => {
      state.comments = action.payload;
    }).addCase(setOffer, (state, action) => {
      state.offer = action.payload;
    }).addCase(setPostLoadStatus, (state, action) => {
      state.postLoaded = action.payload;
    });
});

export {reducer};
