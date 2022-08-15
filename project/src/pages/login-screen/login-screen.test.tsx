import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import HistoryRouter from '../../components/history-route/history-route';
import { AppRoute, AuthorizationStatus } from '../../const';
import LoginScreen from './login-screen';
import userEvent from '@testing-library/user-event';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();

describe('Component: LoginScreen', () => {
  it('should render correctly', async () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.NoAuth}
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <LoginScreen />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('loginTitle').textContent).toBe('Sign in');
    expect(screen.getByText(/password/i)).toBeInTheDocument();
    expect(screen.getByText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button').textContent).toBe('Sign in');

    await userEvent.type(screen.getByTestId('password'), 'pass123ASD');
    await userEvent.type(screen.getByTestId('login'), 'mock@email.com');

    expect(screen.getByDisplayValue('pass123ASD')).toBeInTheDocument();
    expect(screen.getByDisplayValue('mock@email.com')).toBeInTheDocument();
  });

  it('should redirect to "Main" if authStatus = "AUTH"', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Auth}
    });

    history.push(AppRoute.Login);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.Main} element={<h1>main screen</h1>}/>
            <Route path={AppRoute.Login} element={<LoginScreen />}/>
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/main screen/i)).toBeInTheDocument();
    expect(screen.queryByText(/password/i)).not.toBeInTheDocument();
  });

  it('should redirect to "/" and call "changeCity" when user click on city name', async () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.NoAuth}
    });
    history.push(AppRoute.Login);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.Login} element={<LoginScreen />} />
            <Route path={AppRoute.Main} element={<h1>main screen</h1>} />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.queryByText(/main screen/i)).not.toBeInTheDocument();
    expect(store.getActions().length).toBe(0);
    const city = screen.getByTestId('randomCity').textContent;

    await userEvent.click(screen.getByTestId('randomCity'));

    expect(screen.getByText(/main screen/i)).toBeInTheDocument();
    expect(store.getActions().length).toBe(1);
    expect(store.getActions()[0].type).toBe('APP/changeCity');
    expect(store.getActions()[0].payload).toBe(city);
    expect(screen.getByText(/main screen/i)).toBeInTheDocument();
  });

  it('should call "loginAction" when when user submit form with correct data', async () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.NoAuth}
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <LoginScreen />
        </HistoryRouter>
      </Provider>
    );

    expect(store.getActions().length).toBe(0);

    await userEvent.type(screen.getByTestId('password'), 'pass123ASD');
    await userEvent.type(screen.getByTestId('login'), 'mock@email.com');
    await userEvent.click(screen.getByTestId('submitButton'));

    expect(store.getActions()[0].type).toBe('USER/login/pending');
    expect(store.getActions()[0].meta.arg).toEqual({email: 'mock@email.com', password: 'pass123ASD'});
  });

  it('should call "setErrorMessage" and "clearError" if user submit form with incorrect DATA', async () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.NoAuth}
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <LoginScreen />
        </HistoryRouter>
      </Provider>
    );

    expect(store.getActions().length).toBe(0);

    await userEvent.type(screen.getByTestId('password'), 'pass');
    await userEvent.type(screen.getByTestId('login'), 'mock.com');
    await userEvent.click(screen.getByTestId('submitButton'));

    expect(store.getActions().length).toBe(3);
    expect(store.getActions()[0].type).toBe('APP/setErrorMessage');
    expect(store.getActions()[1].type).toBe('DATA/clearError/pending');
    expect(store.getActions()[2].type).toBe('DATA/clearError/fulfilled');
  });
});
