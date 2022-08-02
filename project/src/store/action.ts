import { createAction } from '@reduxjs/toolkit';

import { Comments, Offer, Offers } from '../types/offer';

export const changeCity = createAction<{city: string}>('changeCity');

export const changeSortBy = createAction<{sortBy: string}>('changeSortBy');

export const loadOffers = createAction<Offers>('loadOffers');

export const setDataLoadStatus = createAction<boolean>('setDataLoadStatus');

export const setErrorMessage = createAction<string | null>('setErrorMessage');

export const setNearbyOffers = createAction<Offers>('setNearbyOffers');

export const setComments = createAction<Comments>('setComments');

export const setOffer = createAction<Offer>('setOffer');

export const setPostLoadStatus = createAction<boolean>('setPostLoadStatus');
