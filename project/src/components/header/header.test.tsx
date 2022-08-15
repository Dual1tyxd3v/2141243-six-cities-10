import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import HistoryRouter from '../history-route/history-route';
import Header from './header';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.Auth},
  DATA: {offersFavorites: []}
});

describe('Component: Header', () => {
  it('should render correctly', () => {
    history.push(AppRoute.Main);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Header />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByAltText(/6 cities logo/i)).toBeInTheDocument();
    expect(screen.getByText(/sign out/i)).toBeInTheDocument();
  });

  it('should hide "HeaderNav" component if location is "/login"', () => {
    history.push(AppRoute.Login);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Header />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.queryByText(/sign out/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/sign in/i)).not.toBeInTheDocument();
  });

  it('should redirect to "/" when user click link', async () => {
    history.push(AppRoute.Login);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.Login} element={<Header />}/>
            <Route path={AppRoute.Main} element={<h1>main screen</h1>} />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.queryByText(/main screen/i)).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole('link'));

    expect(screen.getByText(/main screen/i)).toBeInTheDocument();
    expect(history.location.pathname).toBe(AppRoute.Main);
  });
});
