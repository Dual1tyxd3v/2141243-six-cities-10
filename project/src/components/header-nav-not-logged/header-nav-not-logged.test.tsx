import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import HeaderNavNotLogged from './header-nav-not-logged';

const history = createMemoryHistory();

describe('Component: HeaderNavNotLogged', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <HeaderNavNotLogged />
      </HistoryRouter>
    );

    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
  });
});
