import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk, {ThunkDispatch} from 'redux-thunk';
import { configureMockStore, MockStoreEnhanced } from '@jedmao/redux-mock-store';
import { ChangeStatusData, State } from '../types/state';
import { Action } from '@reduxjs/toolkit';
import { APIRoute } from '../const';
import { addCommentAction, changeOfferFavoriteStatusAction, checkAuthAction, clearErrorAction, fetchCommentsAction, fetchFavoriteOffersAction, fetchNearbyOffersAction, fetchOfferAction, fetchOffersAction, loginAction, logoutAction } from './api-actions';
import { makeFakeComments, makeFakeOffer, makeFakeOffers } from '../utils/mocks';
import { datatype } from 'faker';
import { PostData } from '../types/post-data';

const mockOffers = makeFakeOffers();

jest.mock('../services/api-error-handler', () => jest.fn());

describe('Async functions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State, Action, ThunkDispatch<State, typeof api, Action>
  >(middlewares);
  let store: MockStoreEnhanced<State, Action, ThunkDispatch<State, typeof api, Action>>;

  beforeEach(() => {
    store = mockStore();
  });

  it('should dispatch Logout when Delete /logout', async () => {
    mockAPI.onDelete(APIRoute.Logout).reply(204);

    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      logoutAction.pending.type,
      logoutAction.fulfilled.type
    ]);

    expect(Storage.prototype.removeItem).toBeCalledTimes(2);
    expect(Storage.prototype.removeItem).nthCalledWith(1, 'cit_cities_token');
    expect(Storage.prototype.removeItem).nthCalledWith(2, 'user_info');
  });

  it('should dispatch Login when POST /login', async () => {
    const fakeAuthData = {email: 'mock@email.com', password: 'qwe123ASD'};

    mockAPI.onPost(APIRoute.Login, fakeAuthData).reply(200, {token: 'some-token'});

    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(fakeAuthData));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      loginAction.pending.type,
      loginAction.fulfilled.type
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(2);
    expect(Storage.prototype.setItem).nthCalledWith(1, 'cit_cities_token', 'some-token');
    expect(Storage.prototype.setItem).nthCalledWith(2, 'user_info', fakeAuthData.email);
  });

  it('should auth status is "auth" when server return 200', async () => {
    mockAPI.onGet(APIRoute.Login).reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      checkAuthAction.pending.type,
      checkAuthAction.fulfilled.type
    ]);
  });

  it('should dispatch load offers when GET /hotels', async () => {
    mockAPI.onGet(APIRoute.Offers).reply(200, mockOffers);

    await store.dispatch(fetchOffersAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchOffersAction.pending.type,
      fetchOffersAction.fulfilled.type
    ]);
  });

  it('should dispatch load offer when GET /hotels/id', async () => {
    const mockOffer = makeFakeOffer();
    const id = datatype.number({min: 1, max: 90});
    mockAPI.onGet(APIRoute.Offer + id).reply(200, mockOffer);

    await store.dispatch(fetchOfferAction(id));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchOfferAction.pending.type,
      fetchOfferAction.fulfilled.type
    ]);
  });

  it('should dispatch load nearby offers when GET /hotels/id/nearby', async () => {
    const id = datatype.number({min: 1, max: 90});
    mockAPI.onGet(APIRoute.Offer + id + APIRoute.Nearby).reply(200, mockOffers);

    await store.dispatch(fetchNearbyOffersAction(id));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchNearbyOffersAction.pending.type,
      fetchNearbyOffersAction.fulfilled.type
    ]);
  });

  it('should dispatch load comments when GET /comments/id', async () => {
    const mockComments = makeFakeComments();
    const id = datatype.number({min: 1, max: 90});
    mockAPI.onGet(APIRoute.Comments + id).reply(200, mockComments);

    await store.dispatch(fetchCommentsAction(id));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchCommentsAction.pending.type,
      fetchCommentsAction.fulfilled.type
    ]);
  });

  it('should dispatch clear error message when implement action', async () => {

    await store.dispatch(clearErrorAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      clearErrorAction.pending.type,
      clearErrorAction.fulfilled.type
    ]);
  });

  it('should dispatch add comment when POST /comments/id', async () => {
    const id = datatype.number({min: 1, max: 90});
    const fakeComment: PostData = {comment: 'Some text', id, rating: 2};
    mockAPI.onPost(APIRoute.Comments + id).reply(200, fakeComment);

    await store.dispatch(addCommentAction(fakeComment));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      addCommentAction.pending.type,
      addCommentAction.fulfilled.type
    ]);
  });

  it('should dispatch load favorite offers when GET /favorite', async () => {
    mockAPI.onGet(APIRoute.Favorite).reply(200, mockOffers);

    await store.dispatch(fetchFavoriteOffersAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchFavoriteOffersAction.pending.type,
      fetchFavoriteOffersAction.fulfilled.type
    ]);
  });

  it('should dispatch change offer favorite status when POST /favorite/id/status', async () => {
    const id = datatype.number({min: 1, max: 90});
    const status = datatype.number({min: 0, max: 1});
    const fakeStatusData: ChangeStatusData = {id, status};

    mockAPI.onPost(`${APIRoute.Favorite}/${id}/${status}`).reply(200, fakeStatusData);

    await store.dispatch(changeOfferFavoriteStatusAction(fakeStatusData));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      changeOfferFavoriteStatusAction.pending.type,
      fetchFavoriteOffersAction.pending.type,
      changeOfferFavoriteStatusAction.fulfilled.type
    ]);
  });
});
