import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../../components/history-route/history-route';
import { AuthorizationStatus } from '../../const';
import NotFoundScreen from './not-found-screen';

describe('Component: NotFoundScreen', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    const mockStore = configureMockStore();
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.NoAuth}
    });

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
});
