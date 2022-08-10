import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import Tabs from './tabs';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: Tabs', () => {
  it('should render correctly', () => {
    const activeCity = 'Paris';
    const store = mockStore({
      APP: {city: activeCity}
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Tabs />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(activeCity)).toBeInTheDocument();

    const activeLink = screen.getAllByRole('link').filter((link) => link.textContent === activeCity);

    expect(activeLink[0].classList.contains('tabs__item--active')).toBe(true);
  });
});
