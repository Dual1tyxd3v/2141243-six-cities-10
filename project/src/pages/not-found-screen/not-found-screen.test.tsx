import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import HistoryRouter from '../../components/history-route/history-route';
import { AppRoute, AuthorizationStatus } from '../../const';
import userEvent from '@testing-library/user-event';
import NotFoundScreen from './not-found-screen';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.NoAuth}
});

describe('Component: NotFoundScreen', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <NotFoundScreen />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/404 - Page not found./i)).toBeInTheDocument();
    expect(screen.getByText(/Back to main./i)).toBeInTheDocument();
  });

  it('should redirect to "/" when user click link', async () => {
    history.push('/some-wrong-url');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path='/some-wrong-url' element={<NotFoundScreen />} />
            <Route path={AppRoute.Main} element={<h1>main screen</h1>} />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.queryByText(/main screen/i)).not.toBeInTheDocument();

    await userEvent.click(screen.getByTestId('linkBackToMain'));

    expect(screen.getByText(/main screen/i)).toBeInTheDocument();
  });
});
