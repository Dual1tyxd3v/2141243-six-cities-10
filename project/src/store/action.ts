import { createAction } from '@reduxjs/toolkit';
import { Offers } from '../types/offer';

export const changeCity = createAction<{city: string}>('changeCity');

export const changeSortBy = createAction<{sortBy: string}>('changeSortBy');

export const loadOffers = createAction<Offers>('loadOffers');

export const setDataLoadStatus = createAction<boolean>('setDataLoadStatus');
