import { createReducer } from '@reduxjs/toolkit';
import { setErrorMessage } from './action';

type InitialState = {
  error: string | null;
}

const initialState: InitialState = {
  error: null
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setErrorMessage, (state, action) => {
      state.error = action.payload;
    });
});

export {reducer};
