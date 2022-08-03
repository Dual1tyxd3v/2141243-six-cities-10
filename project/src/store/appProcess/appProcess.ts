import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { AppProcess } from '../../types/state';

const initialState: AppProcess = {
  city: 'Paris',
  sortBy: 'Popular',
  error: null,
};

export const appProcess = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    changeCity: (state, action) => {
      state.city = action.payload;
    },
    changeSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.error = action.payload;
    }
  },
});

export const {changeCity, changeSortBy, setErrorMessage} = appProcess.actions;
