import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { AppRoute } from '../../const';
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

  it('should redirect to "/login" when user click link', async () => {
    history.push(AppRoute.Main);

    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route path={AppRoute.Main} element={<HeaderNavNotLogged />} />
          <Route path={AppRoute.Login} element={<h1>login screen</h1>} />
        </Routes>
      </HistoryRouter>
    );

    expect(screen.queryByText(/login screen/i)).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole('link'));

    expect(screen.getByText(/login screen/i)).toBeInTheDocument();
  });
});
