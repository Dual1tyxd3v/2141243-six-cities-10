import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../../components/history-route/history-route';
import { AuthorizationStatus } from '../../const';
import { makeFakeOffers } from '../../utils/mocks';
import FavotitesScreen from './favorites-screen';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Component: FavoritesScreen', () => {
  it('should render correctly', () => {
    const mockOffers = makeFakeOffers();
    const cityFromOffers = mockOffers[0].city.name;

    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Auth},
      DATA: {offersFavorites: mockOffers, reloadFavorites: false}
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FavotitesScreen />
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
          <FavotitesScreen />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.queryByText(/Saved listing/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Nothing yet saved./i)).toBeInTheDocument();
  });
});
