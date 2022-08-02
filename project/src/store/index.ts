import { createAPI } from '../services/api';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';

const api = createAPI();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      }
    }),
});
