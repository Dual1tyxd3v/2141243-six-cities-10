import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { makeFakeOffers } from '../../utils/mocks';
import userEvent from '@testing-library/user-event';
import HistoryRouter from '../history-route/history-route';
import HeaderNavLogged from './header-nav-logged';
import thunk from 'redux-thunk';
import { State } from '../../types/state';
import { AnyAction } from '@reduxjs/toolkit';

const middlewares = [thunk];
const mockStore = configureMockStore<State, AnyAction>(middlewares);
const history = createMemoryHistory();
const mockOffers = makeFakeOffers();
let store: MockStore;

describe('Component: HeaderNavLogged', () => {
  beforeEach(() => {
    store = mockStore({
      DATA: {offersFavorites: mockOffers},
      USER: {authorizationStatus: AuthorizationStatus.Auth}
    });
  });

  it('should render correctly', () => {
    const mockOffersFavorites = mockOffers.filter((offer) => offer.isFavorite === true);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HeaderNavLogged />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('offersCounter').textContent).toBe(mockOffersFavorites.length.toString());
    expect(screen.getByText(/sign out/i)).toBeInTheDocument();
  });

  it('should redirect to "/favorites" when user click on E-mail tab', async () => {
    history.push(AppRoute.Main);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.Main} element={<HeaderNavLogged />} />
            <Route path={AppRoute.Favorites} element={<h1>favorites screen</h1>} />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.queryByText(/favorites screen/i)).not.toBeInTheDocument();

    await userEvent.click(screen.getByTestId('emailLink'));

    expect(history.location.pathname).toBe(AppRoute.Favorites);
    expect(screen.getByText(/favorites screen/i)).toBeInTheDocument();
    expect(store.getActions().length).toBe(2);
    expect(store.getActions()[0].type).toBe('DATA/fetchFavoriteOffers/pending');
  });

  it('should clear "offersFavorites" and change when user click on "Sign out"', async () => {
    history.push(AppRoute.Room + 4);
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HeaderNavLogged />
        </HistoryRouter>
      </Provider>
    );
    expect(store.getActions()).toEqual([]);
    expect(screen.getByText(/sign out/i)).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('sign-out'));

    expect(store.getActions().length).toBe(7);
    expect(store.getActions()[0].type).toBe('USER/logout/pending');
    expect(store.getActions()[1].type).toBe('DATA/fetchOffers/pending');
    expect(store.getActions()[2].type).toBe('DATA/clearFavoriteOffers');
    expect(store.getActions()[3].type).toBe('DATA/fetchNearbyOffers/pending');
  });
});
