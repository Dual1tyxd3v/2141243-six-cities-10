import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { AppRoute, AuthorizationStatus, MAX_COMMENTS_TO_VIEW } from '../../const';
import { makeFakeComments, makeFakeOffer, makeFakeOffers } from '../../utils/mocks';
import thunk from 'redux-thunk';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import HistoryRouter from '../../components/history-route/history-route';
import RoomScreen from './room-screen';
import { Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const mockOffers = makeFakeOffers();
const mockOffer = makeFakeOffer();
const mockComments = makeFakeComments();
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.NoAuth},
  DATA: {
    offer: mockOffer,
    offersNearby: mockOffers,
    comments: mockComments
  }
});
const history = createMemoryHistory();

describe('Component: RoomScreen', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <RoomScreen />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getAllByAltText('Studio').length).toBe(mockOffer.images.length);
    expect(screen.getByText(new RegExp(`${mockOffer.bedrooms} Bedrooms`))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`Max ${mockOffer.maxAdults} adults`))).toBeInTheDocument();
    expect(screen.getAllByTestId('goodsItem').length).toBe(mockOffer.goods.length);
    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
    expect(screen.getByText(mockOffer.host.name)).toBeInTheDocument();
    expect(screen.getAllByTestId('commentItem').length).toBe(mockComments.slice(0, MAX_COMMENTS_TO_VIEW).length);
    expect(screen.getByTestId('mapContainer')).toBeInTheDocument();
    expect(screen.getAllByTestId('cardContainer').length).toBe(mockOffers.length);
  });

  it('should redirect to "/login" when user click on "toBookmark" button with NO_AUTH status', async () => {
    history.push(AppRoute.Room + mockOffer.id);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.Room + mockOffer.id} element={<RoomScreen />} />
            <Route path={AppRoute.Login} element={<h1>login screen</h1>} />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.queryByText(/login screen/i)).not.toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${mockOffer.bedrooms} Bedrooms`))).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('toBookmark'));

    expect(screen.getByText(/login screen/i)).toBeInTheDocument();
    expect(screen.queryByText(new RegExp(`${mockOffer.bedrooms} Bedrooms`))).not.toBeInTheDocument();
  });

  it('should call "changeOfferFavoriteStatusAction" when user click "toBookmark" button with AUTH status', async () => {
    history.push(AppRoute.Room + mockOffer.id);
    store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Auth},
      DATA: {
        offer: mockOffer,
        offersNearby: mockOffers,
        comments: mockComments,
        offersFavorites: []
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <RoomScreen />
        </HistoryRouter>
      </Provider>
    );

    expect(store.getActions().length).toBe(3);

    await userEvent.click(screen.getByTestId('toBookmark'));

    expect(store.getActions().length).toBe(8);
    expect(store.getActions()[6].type).toBe('DATA/changeOfferFavoriteStatus/pending');
  });

  it('should return "NotFoundScreen" when offer is null', async () => {
    store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Auth},
      DATA: {
        offer: null,
        offersNearby: mockOffers,
        comments: mockComments,
        offersFavorites: []
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <RoomScreen />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/404 - Page not found./i)).toBeInTheDocument();
  });

  it('should return "Loading data" when offer is null and isLoaded status = true', async () => {
    store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Auth},
      DATA: {
        offer: null,
        offersNearby: mockOffers,
        comments: mockComments,
        offersFavorites: [],
        isLoaded: true
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <RoomScreen />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Loading DATA/i)).toBeInTheDocument();
  });
});
