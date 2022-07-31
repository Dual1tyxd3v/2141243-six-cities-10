import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { store } from '.';
import { APIRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR } from '../const';
import { dropToken, saveToken } from '../services/token';
import { dropUserInfo, saveUserInfo } from '../services/userInfo';
import { AuthData } from '../types/auth-data';
import { Comments, Offer, Offers } from '../types/offer';
import { PostData } from '../types/post-data';
import { AppDispatch, State } from '../types/state';
import { UserData } from '../types/user-data';
import { loadOffers, setAuthStatus, setComments, setDataLoadStatus, setErrorMessage, setNearbyOffers, setOffer, setPostLoadStatus } from './action';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch, state: State, extra: AxiosInstance
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setDataLoadStatus(true));
    const {data} = await api.get<Offers>(APIRoute.Offers);
    dispatch(loadOffers(data));
    dispatch(setDataLoadStatus(false));
  },
);

export const fetchOfferAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch, state: State, extra: AxiosInstance
}>(
  'data/fetchOffer',
  async (id, {dispatch, extra: api}) => {
    dispatch(setDataLoadStatus(true));
    const {data} = await api.get<Offer>(`/hotels/${id}`);
    dispatch(setOffer(data));
    dispatch(setDataLoadStatus(false));
  }
);

export const fetchNearbyOffersAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch, state: State, extra: AxiosInstance
}>(
  'data/fetchNearbyOffers',
  async (id, {dispatch, extra: api}) => {
    const NEARBY_OFFERS_ROUTE = `/hotels/${id}/nearby`;
    const {data: nearbyOffers} = await api.get<Offers>(NEARBY_OFFERS_ROUTE);
    dispatch(setNearbyOffers(nearbyOffers));
  },
);

export const fetchCommentsAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch, state: State, extra: AxiosInstance
}>(
  'data/fetchComments',
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<Comments>(APIRoute.Comments + id);
    dispatch(setComments(data));
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch, state: State, extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(setAuthStatus(AuthorizationStatus.Auth));
    }
    catch {
      dispatch(setAuthStatus(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch, state: State, extra: AxiosInstance
}>(
  'user/login',
  async ({email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    saveUserInfo(email);
    dispatch(setAuthStatus(AuthorizationStatus.Auth));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch, state: State, extra: AxiosInstance
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dropUserInfo();
    dispatch(setAuthStatus(AuthorizationStatus.NoAuth));
  },
);

export const clearErrorAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch, state: State, extra: AxiosInstance
}>(
  'clearError',
  () => {
    setTimeout(
      () => store.dispatch(setErrorMessage(null)),
      TIMEOUT_SHOW_ERROR
    );
  },
);

export const addCommentAction = createAsyncThunk<void, PostData, {
  dispatch: AppDispatch, state: State, extra: AxiosInstance
}>(
  'addComment',
  async ({comment, rating, id}, {dispatch, extra: api}) => {
    try {
      dispatch(setPostLoadStatus(true));
      const resp = await api.post<Comments>(APIRoute.Comments + id, {comment, rating});
      dispatch(setComments(resp.data));
      dispatch(setPostLoadStatus(false));
    }
    catch {
      dispatch(setPostLoadStatus(false));
    }
  },

);
