import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import HistoryRouter from '../history-route/history-route';
import PrivateRoute from './private-route';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Component: PrivateRoute', () => {
  beforeEach(() => {
    history.push('/private');
  });

  it('should render component for public route when "AuthStatus" is "NO_AUTH"', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.NoAuth}
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.Login} element={<h1>public route</h1>}/>
            <Route path='/private' element={
              <PrivateRoute>
                <h1>private route</h1>
              </PrivateRoute>
            }
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/public route/i)).toBeInTheDocument();
    expect(screen.queryByText(/private route/i)).not.toBeInTheDocument();
  });

  it('should render component for private route when "AuthStatus" is "AUTH"', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Auth}
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.Login} element={<h1>public route</h1>}/>
            <Route path='/private' element={
              <PrivateRoute>
                <h1>private route</h1>
              </PrivateRoute>
            }
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/private route/i)).toBeInTheDocument();
    expect(screen.queryByText(/public route/i)).not.toBeInTheDocument();
  });
});
