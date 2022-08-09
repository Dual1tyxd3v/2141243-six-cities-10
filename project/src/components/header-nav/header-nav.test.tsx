import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { AuthorizationStatus } from '../../const';
import HistoryRouter from '../history-route/history-route';
import HeaderNav from './header-nav';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Component: HeaderNav', () => {
  it('should render "HeaderNavLogged" when "AuthStatus" is "AUTH"', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Auth},
      DATA: {offersFavorites: []}
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HeaderNav />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
    expect(screen.queryByText(/sign in/i)).not.toBeInTheDocument();
  });

  it('should render "HeaderNavNotLogged" when "AuthStatus" is "NO_AUTH"', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.NoAuth},
      DATA: {offersFavorites: []}
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HeaderNav />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
    expect(screen.queryByText(/sign out/i)).not.toBeInTheDocument();
  });
});
