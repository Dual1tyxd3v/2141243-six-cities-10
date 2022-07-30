import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../const';
import { Offers } from '../types/offer';
import { UserData } from '../types/user-data';
import { changeCity, changeSortBy, loadOffers, setAuthStatus, setDataLoadStatus, setErrorMessage, setUserInfo } from './action';

type InitialState = {
  city: string;
  offers: Offers;
  sortBy: string;
  isLoaded: boolean;
  authorizationStatus: AuthorizationStatus;
  error: string | null;
  userInfo: UserData | null;
}

const initialState: InitialState = {
  city: 'Paris',
  offers: [],
  sortBy: 'Popular',
  isLoaded: true,
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  userInfo: null,
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
    }).addCase(setUserInfo, (state, action) => {
      state.userInfo = action.payload;
    });
});

export {reducer};
