import { createAPI } from '../services/api';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import { redirect } from './middlewares/redirect';

const api = createAPI();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      }
    }).concat(redirect),
});
