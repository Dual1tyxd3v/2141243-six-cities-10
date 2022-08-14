import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import HistoryRouter from '../history-route/history-route';
import Footer from './footer';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();

describe('Component: Footer', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <Footer />
      </HistoryRouter>
    );

    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
  });

  it('shoud redirect to "MainScreen" when user click link', async () => {
    history.push(AppRoute.Login);

    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route path={AppRoute.Login} element={<Footer />} />
          <Route path={AppRoute.Main} element={<h1>main screen</h1>} />
        </Routes>
      </HistoryRouter>
    );

    expect(screen.queryByText(/main screen/i)).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole('link'));

    expect(history.location.pathname).toBe(AppRoute.Main);
    expect(screen.getByText(/main screen/i)).toBeInTheDocument();
  });
});
