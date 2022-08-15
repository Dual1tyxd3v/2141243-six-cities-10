import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../../components/history-route/history-route';
import { AuthorizationStatus } from '../../const';
import { makeFakeOffers } from '../../utils/mocks';
import MainScreen from './main-screen';

window.scrollTo = jest.fn();
const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: MainScreen', () => {
  it('should render correctly when offers loaded', () => {
    const mockOffers = makeFakeOffers();
    const city = mockOffers[0].city.name;

    const store = mockStore({
      APP: {city: city},
      DATA: {offers: mockOffers, isLoaded: false},
      USER: {authorizationStatus: AuthorizationStatus.NoAuth}
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MainScreen />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
    expect(screen.queryByText(/loading data/i)).not.toBeInTheDocument();
    expect(screen.getByTestId('mainContainer').classList.contains('page__main--index-empty')).toBe(false);
  });

  it('should render correctly when offers is loading', () => {
    const mockOffers = makeFakeOffers();
    const city = mockOffers[0].city.name;

    const store = mockStore({
      APP: {city: city},
      DATA: {offers: [], isLoaded: true},
      USER: {authorizationStatus: AuthorizationStatus.NoAuth}
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MainScreen />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/loading data/i)).toBeInTheDocument();
    expect(screen.getByTestId('mainContainer').classList.contains('page__main--index-empty')).toBe(true);
  });
});
