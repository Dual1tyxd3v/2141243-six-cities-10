import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../../components/history-route/history-route';
import { AuthorizationStatus } from '../../const';
import FavoritesScreenEmpty from './favorites-screen-empty';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Component: MainScreenEmpty', () => {
  it('should render correctly', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Auth},
      DATA: {offersFavorite: [], offers: []}
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FavoritesScreenEmpty />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Nothing yet saved./i)).toBeInTheDocument();
    expect(screen.getByText(/Save properties to narrow down search or plan your future trips./i)).toBeInTheDocument();
  });
});
