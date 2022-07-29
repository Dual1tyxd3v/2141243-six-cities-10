import { createReducer } from '@reduxjs/toolkit';
import { Offers } from '../types/offer';
import { changeCity, changeSortBy, loadOffers, setDataLoadStatus } from './action';

type InitialState = {
  city: string;
  offers: Offers;
  sortBy: string;
  isLoaded: boolean;
}

const initialState: InitialState = {
  city: 'Paris',
  offers: [],
  sortBy: 'Popular',
  isLoaded: true,
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
    });
});

export {reducer};
