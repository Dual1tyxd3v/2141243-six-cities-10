import { createAction } from '@reduxjs/toolkit';

export const setErrorMessage = createAction<string | null>('setErrorMessage');
