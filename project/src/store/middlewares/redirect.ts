import { Middleware } from '@reduxjs/toolkit';
import { browserHistory } from '../../browserHistory';
import { rootReducer } from '../rootReducer';

type Reducer = ReturnType<typeof rootReducer>;

export const redirect: Middleware<unknown, Reducer> =
  (store) => (next) => (action) => {
    if (action.type === 'redirectToRoute') {
      browserHistory.push(action.payload);
    }
    return next(action);
  };
