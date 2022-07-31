import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../const';
import { Comments, Offers } from '../types/offer';
import { changeCity, changeSortBy, loadOffers, setAuthStatus, setComments, setDataLoadStatus, setErrorMessage, setNearbyOffers } from './action';

type InitialState = {
  city: string;
  offers: Offers;
  sortBy: string;
  isLoaded: boolean;
  authorizationStatus: AuthorizationStatus;
  error: string | null;
  nearbyOffers: Offers;
  comments: Comments;
}

const initialState: InitialState = {
  city: 'Paris',
  offers: [],
  sortBy: 'Popular',
  isLoaded: true,
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  nearbyOffers: [],
  comments: [],
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
    }).addCase(setAuthStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    }).addCase(setErrorMessage, (state, action) => {
      state.error = action.payload;
    }).addCase(setNearbyOffers, (state, action) => {
      state.nearbyOffers = action.payload;
    }).addCase(setComments, (state, action) => {
      state.comments = action.payload;
    });
});

export {reducer};
