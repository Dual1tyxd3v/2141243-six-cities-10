import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import HistoryRouter from '../../components/history-route/history-route';
import { AuthorizationStatus, CITIES, sortMenuTabs } from '../../const';
import { makeFakeOffers } from '../../utils/mocks';
import userEvent from '@testing-library/user-event';
import MainScreenContent from './main-screen-content';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  APP: {sortBy: sortMenuTabs.Popular},
  USER: {authorizationStatus: AuthorizationStatus.NoAuth}
});
const history = createMemoryHistory();
const mockOffers = makeFakeOffers();

describe('Component: MainScreenContent', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MainScreenContent offers={mockOffers} city={CITIES.Paris}/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(new RegExp(`${mockOffers.length} places to stay in ${CITIES.Paris}`))).toBeInTheDocument();
    expect(screen.getByText(sortMenuTabs.Popular)).toBeInTheDocument();
    expect(screen.queryByText(sortMenuTabs.PriceHighToLow)).not.toBeInTheDocument();
    expect(screen.getAllByRole('article').length).toBe(mockOffers.length);
  });

  it('should open "SortMenu" when user click on sort tab', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MainScreenContent offers={mockOffers} city={CITIES.Paris}/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(sortMenuTabs.Popular)).toBeInTheDocument();
    expect(screen.queryByText(sortMenuTabs.PriceHighToLow)).not.toBeInTheDocument();

    await userEvent.click(screen.getByTestId('sortTab'));

    expect(screen.getByText(sortMenuTabs.PriceHighToLow)).toBeInTheDocument();
  });
});
