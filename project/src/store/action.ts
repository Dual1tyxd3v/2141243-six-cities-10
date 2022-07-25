import { createAction } from '@reduxjs/toolkit';

export const changeCity = createAction<{city: string}>('changeCity');

export const changeSortBy = createAction<{sortBy: string}>('changeSortBy');
