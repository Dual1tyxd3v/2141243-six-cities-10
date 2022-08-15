import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { CITIES } from '../../const';
import userEvent from '@testing-library/user-event';
import HistoryRouter from '../history-route/history-route';
import Tabs from './tabs';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const activeCity = CITIES.Paris;
const store = mockStore({
  APP: {city: activeCity}
});

describe('Component: Tabs', () => {
  it('should render correctly', () => {
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

  it('should call "changeCity" when user click on link', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Tabs />
        </HistoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getByText(CITIES.Cologne));

    expect(store.getActions().length).toBe(1);
    expect(store.getActions()[0].type).toBe('APP/changeCity');
    expect(store.getActions()[0].payload).toBe(CITIES.Cologne);
  });
});
