import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import HistoryRouter from '../../components/history-route/history-route';
import { AppRoute, AuthorizationStatus } from '../../const';
import { makeFakeOffers } from '../../utils/mocks';
import FavoritesScreen from './favorites-screen';
import userEvent from '@testing-library/user-event';

window.scrollTo = jest.fn();
const history = createMemoryHistory();
const mockStore = configureMockStore();
const mockOffers = makeFakeOffers();

describe('Component: FavoritesScreen', () => {
  it('should render correctly', () => {
    const cityFromOffers = mockOffers[0].city.name;

    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Auth},
      DATA: {offersFavorites: mockOffers, reloadFavorites: false}
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FavoritesScreen />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
    expect(screen.getByText(cityFromOffers)).toBeInTheDocument();

    const buttonsFromOffers = screen.getAllByRole('button').map((btn) => btn.classList.contains('place-card__bookmark-button--active'));

    expect(buttonsFromOffers.length).toBe(mockOffers.length);
  });

  it('should return "Favorites Empty Screen" if offers.length = 0', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Auth},
      DATA: {offersFavorites: [], reloadFavorites: false}
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FavoritesScreen />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.queryByText(/Saved listing/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Nothing yet saved./i)).toBeInTheDocument();
  });

  it('should redirect to "/" and call "changeCity" when user click on city name', async () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Auth},
      DATA: {offersFavorites: mockOffers, reloadFavorites: false},
    });
    history.push(AppRoute.Favorites);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.Favorites} element={<FavoritesScreen />} />
            <Route path={AppRoute.Main} element={<h1>main screen</h1>}/>
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.queryByText(/main screen/i)).not.toBeInTheDocument();
    expect(store.getActions().length).toBe(0);

    await userEvent.click(screen.getByText(mockOffers[0].city.name));

    expect(store.getActions().length).toBe(1);
    expect(store.getActions()[0].type).toBe('APP/changeCity');
    expect(store.getActions()[0].payload).toBe(mockOffers[0].city.name);
    expect(screen.getByText(/main screen/i)).toBeInTheDocument();
  });
});
