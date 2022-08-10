import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { makeFakeOffers } from '../../utils/mocks';
import HistoryRouter from '../history-route/history-route';
import HeaderNavLogged from './header-nav-logged';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: HeaderNavLogged', () => {
  it('should render correctly', () => {
    const mockOffers = makeFakeOffers();
    const mockOffersFavorites = mockOffers.filter((offer) => offer.isFavorite === true);
    const store = mockStore({
      DATA: {offersFavorites: mockOffers}
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HeaderNavLogged />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(mockOffersFavorites.length)).toBeInTheDocument();
    expect(screen.getByText(/sign out/i)).toBeInTheDocument();
  });
});
