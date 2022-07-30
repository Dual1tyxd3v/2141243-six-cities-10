import { createAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../const';
import { Offers } from '../types/offer';

export const changeCity = createAction<{city: string}>('changeCity');

export const changeSortBy = createAction<{sortBy: string}>('changeSortBy');

export const loadOffers = createAction<Offers>('loadOffers');

export const setDataLoadStatus = createAction<boolean>('setDataLoadStatus');

export const setAuthStatus = createAction<AuthorizationStatus>('setAuthStatus');

export const setErrorMessage = createAction<string | null>('setErrorMessage');

