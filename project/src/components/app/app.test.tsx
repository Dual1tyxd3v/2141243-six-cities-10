import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { AppRoute, AuthorizationStatus } from '../../const';
import { makeFakeOffers } from '../../utils/mocks';
import HistoryRouter from '../history-route/history-route';
import App from './app';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const mockOffers = makeFakeOffers();
const defaultCity = mockOffers[0].city.name;

let store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.Auth},
  APP: {city: defaultCity},
  DATA: {offers: mockOffers, offersFavorites: mockOffers}
});

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('App Routing', () => {
  it('should render "Main" when user navigate to "/"', () => {
    history.push(AppRoute.Main);

    const offersInDefaultCity = mockOffers.filter((offer) => offer.city.name === defaultCity);

    render(fakeApp);

    expect(screen.getByText(new RegExp(`${offersInDefaultCity.length} places to stay in ${defaultCity}`))).toBeInTheDocument();
    expect(screen.getByText(/sign out/i)).toBeInTheDocument();
    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
  });

  /* it('should render "Room Screen" when user navigate to "/offer/id"', () => {
    В задании пока просят не тестировать компоненты с useEffect поэтому пока закомментировал =)
  }); */

  it('should render "NotFound Screen" when user navigate to non-existance route', () => {
    history.push('/some-route');

    render(fakeApp);

    expect(screen.getByText(/404 - Page not found./i)).toBeInTheDocument();
  });

  it('should render "Favorites Screen" when user navigate to "/favorites"', () => {
    history.push(AppRoute.Favorites);

    render(fakeApp);

    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
    expect(screen.getByText(defaultCity)).toBeInTheDocument();
  });

  it('should render "Login Screen" when user navigate to "/login"', () => {
    store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.NoAuth},
      APP: {city: defaultCity},
      DATA: {offers: mockOffers, offersFavorites: mockOffers}
    });

    history.push(AppRoute.Login);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <App />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/password/i)).toBeInTheDocument();
    expect(screen.getByText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button').textContent).toBe('Sign in');
  });
});
