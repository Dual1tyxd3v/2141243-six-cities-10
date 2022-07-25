import { createReducer } from '@reduxjs/toolkit';
import { offers } from '../mocks/offers';
import { changeCity, changeSortBy } from './action';

const initialState = {
  city: 'Paris',
  offers: offers,
  sortBy: 'Popular',
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload.city;
    })
    .addCase(changeSortBy, (state, action) => {
      state.sortBy = action.payload.sortBy;
    });
});

export {reducer};
