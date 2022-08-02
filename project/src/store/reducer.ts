import { createReducer } from '@reduxjs/toolkit';
import { changeCity, changeSortBy, setErrorMessage } from './action';

type InitialState = {
  city: string;
  sortBy: string;
  postStatusCode: number;
  error: string | null;
}

const initialState: InitialState = {
  city: 'Paris',
  sortBy: 'Popular',
  postStatusCode: 0,
  error: null
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload.city;
    })
    .addCase(changeSortBy, (state, action) => {
      state.sortBy = action.payload.sortBy;
    })
    .addCase(setErrorMessage, (state, action) => {
      state.error = action.payload;
    });
});

export {reducer};
