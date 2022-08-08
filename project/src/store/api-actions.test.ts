import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk, {ThunkDispatch} from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { ChangeStatusData, State } from '../types/state';
import { Action } from '@reduxjs/toolkit';
import { APIRoute } from '../const';
import { addCommentAction, changeOfferFavoriteStatusAction, checkAuthAction, clearErrorAction, fetchCommentsAction, fetchFavoriteOffersAction, fetchNearbyOffersAction, fetchOfferAction, fetchOffersAction } from './api-actions';
import { makeFakeComments, makeFakeOffer, makeFakeOffers } from '../utils/mocks';
import { datatype } from 'faker';
import { PostData } from '../types/post-data';

const fakeApiErrorHandler = (error: string) => error;

jest.mock('../services/api-error-handler', () => fakeApiErrorHandler);

describe('Async functions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State, Action, ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should auth status is "auth" when server return 200', async () => {
    mockAPI.onGet(APIRoute.Login).reply(200, []);

    const store = mockStore();

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      checkAuthAction.pending.type,
      checkAuthAction.fulfilled.type
    ]);
  });

  it('should dispatch load offers when GET /hotels', async () => {
    const mockOffers = makeFakeOffers();
    mockAPI.onGet(APIRoute.Offers).reply(200, mockOffers);

    const store = mockStore();

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

    const store = mockStore();

    await store.dispatch(fetchOfferAction(id));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchOfferAction.pending.type,
      fetchOfferAction.fulfilled.type
    ]);
  });

  it('should dispatch load nearby offers when GET /hotels/id/nearby', async () => {
    const mockOffers = makeFakeOffers();
    const id = datatype.number({min: 1, max: 90});
    mockAPI.onGet(APIRoute.Offer + id + APIRoute.Nearby).reply(200, mockOffers);

    const store = mockStore();

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

    const store = mockStore();

    await store.dispatch(fetchCommentsAction(id));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchCommentsAction.pending.type,
      fetchCommentsAction.fulfilled.type
    ]);
  });

  it('should dispatch clear error message when implement action', async () => {
    const store = mockStore();

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

    const store = mockStore();

    await store.dispatch(addCommentAction(fakeComment));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      addCommentAction.pending.type,
      addCommentAction.fulfilled.type
    ]);
  });

  it('should dispatch load favorite offers when GET /favorite', async () => {
    const mockOffers = makeFakeComments();
    mockAPI.onGet(APIRoute.Favorite).reply(200, mockOffers);

    const store = mockStore();

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

    const store = mockStore();

    await store.dispatch(changeOfferFavoriteStatusAction(fakeStatusData));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      changeOfferFavoriteStatusAction.pending.type,
      fetchFavoriteOffersAction.pending.type,
      changeOfferFavoriteStatusAction.fulfilled.type
    ]);
  });
});
