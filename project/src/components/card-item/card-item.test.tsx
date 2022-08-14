import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { AppRoute, AuthorizationStatus } from '../../const';
import { makeFakeOffer, makeFakeOffers } from '../../utils/mocks';
import HistoryRouter from '../history-route/history-route';
import CardItem from './card-item';
import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router-dom';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();
const mockOffer = makeFakeOffer();
const mockOffers = makeFakeOffers().concat(mockOffer);
mockOffer.isFavorite = true;
let store: MockStore;

describe('Component: CardItem', () => {
  beforeEach(() => {
    store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Auth},
      DATA: {offers: mockOffers}
    });
  });

  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CardItem
            offer={mockOffer}
            classPrefix='mockClass'
            onActiveCard={jest.fn()}
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('cardContainer').classList.contains('mockClass__card')).toBe(true);
    expect(screen.getByAltText(/Place/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button').classList.contains('place-card__bookmark-button--active')).toBe(true);
  });

  it('onMouseOverHandler should called when user "mouseEnter" on article', async () => {
    const onMouseOverHandler = jest.fn();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CardItem
            offer={mockOffer}
            classPrefix='mockClass'
            onActiveCard={onMouseOverHandler}
          />
        </HistoryRouter>
      </Provider>
    );

    const article = screen.getByTestId('cardContainer');

    await userEvent.hover(article);

    expect(onMouseOverHandler).toBeCalledTimes(1);
    expect(onMouseOverHandler).nthCalledWith(1, mockOffer, 'mouseenter');
  });

  it('onMouseOverHandler should called when user "mouseLeave" from article', async () => {
    const onMouseOverHandler = jest.fn();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CardItem
            offer={mockOffer}
            classPrefix='mockClass'
            onActiveCard={onMouseOverHandler}
          />
        </HistoryRouter>
      </Provider>
    );

    const article = screen.getByTestId('cardContainer');

    await userEvent.unhover(article);

    expect(onMouseOverHandler).toBeCalledTimes(1);
    expect(onMouseOverHandler).nthCalledWith(1, mockOffer, 'mouseleave');
  });

  it('should redirect to /offer/id when user click Link', async () => {
    history.push(AppRoute.Main);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.Room} element={<h1>offer screen</h1>} />
            <Route path={AppRoute.Main} element={
              <CardItem
                offer={mockOffer}
                classPrefix='mockClass'
                onActiveCard={jest.fn()}
              />
            }
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.queryByText(/offer screen/i)).not.toBeInTheDocument();

    const link = screen.getAllByRole('link')[0];

    await userEvent.click(link);

    expect(screen.getByText(/offer screen/i)).toBeInTheDocument();
    expect(history.location.pathname).toBe(`/offer/${mockOffer.id}`);
  });

  it('handleClick should called "redirectToRoute" when user click button with AuthStatus = "NO_AUTH"', async () => {
    store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.NoAuth},
      DATA: {offers: mockOffers}
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CardItem
            offer={mockOffer}
            classPrefix='mockClass'
            onActiveCard={jest.fn()}
          />
        </HistoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getByRole('button'));

    expect(store.getActions().length).toBe(1);
    expect(store.getActions()[0].type).toBe('redirectToRoute');
    expect(store.getActions()[0].payload).toBe(AppRoute.Login);
  });

  it('handleClick should called "changeOfferFavoriteStatusAction" when user click button with AuthStatus = "AUTH"', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CardItem
            offer={mockOffer}
            classPrefix='mockClass'
            onActiveCard={jest.fn()}
          />
        </HistoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getByRole('button'));

    expect(store.getActions()[0].type).toBe('DATA/changeOfferFavoriteStatus/pending');
    expect(store.getActions()[0].meta.arg).toEqual({id: mockOffer.id, status: Number(!mockOffer.isFavorite)});
  });
});
