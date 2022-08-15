import { redirect } from './redirect';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { State } from '../../types/state';
import { AnyAction } from '@reduxjs/toolkit';
import { redirectToRoute } from '../action';
import { AppRoute } from '../../const';

const fakeHistory = {
  location: {pathname: ''},
  push(path: string) {
    this.location.pathname = path;
  },
};

jest.mock('../../browser-history', () => fakeHistory);

const middlewares = [redirect];
const mockStore = configureMockStore<State, AnyAction>(middlewares);
const store = mockStore();

describe('middleware: redirect', () => {
  beforeEach(() => {
    fakeHistory.push('');
  });

  it('should be redirect to /favorites', () => {
    store.dispatch(redirectToRoute(AppRoute.Favorites));
    expect(fakeHistory.location.pathname).toBe(AppRoute.Favorites);

    expect(store.getActions()).toEqual([redirectToRoute(AppRoute.Favorites)]);
  });

  it('should not to be redirect /login because bad action', () => {
    store.dispatch({type: 'UNKNOWN_ACTION', payload: AppRoute.Login});

    expect(fakeHistory.location.pathname).not.toBe(AppRoute.Login);
  });
});
