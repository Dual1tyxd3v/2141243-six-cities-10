import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute, TIMEOUT_SHOW_ERROR } from '../const';
import { dropToken, saveToken } from '../services/token';
import { dropUserInfo, saveUserInfo } from '../services/userInfo';
import { AuthData } from '../types/auth-data';
import { Comments, Offer, Offers } from '../types/offer';
import { PostData } from '../types/post-data';
import { UserData } from '../types/user-data';
import { setErrorMessage } from './action';
import { AppDispatch, State } from '../types/state';


export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch, state: State, extra: AxiosInstance
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dropUserInfo();
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch, state: State, extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    await api.get(APIRoute.Login);
  },
);

export const fetchOffersAction = createAsyncThunk<Offers, undefined, {
  dispatch: AppDispatch, state: State, extra: AxiosInstance
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Offers>(APIRoute.Offers);
    return data;
  },
);

export const fetchOfferAction = createAsyncThunk<Offer, number, {
  dispatch: AppDispatch, state: State, extra: AxiosInstance
}>(
  'data/fetchOffer',
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<Offer>(`/hotels/${id}`);
    return data;
  }
);

export const fetchNearbyOffersAction = createAsyncThunk<Offers, number, {
  dispatch: AppDispatch, state: State, extra: AxiosInstance
}>(
  'data/fetchNearbyOffers',
  async (id, {dispatch, extra: api}) => {
    const NEARBY_OFFERS_ROUTE = `/hotels/${id}/nearby`;
    const {data: nearbyOffers} = await api.get<Offers>(NEARBY_OFFERS_ROUTE);
    return nearbyOffers;
  },
);

export const fetchCommentsAction = createAsyncThunk<Comments, number, {
  dispatch: AppDispatch, state: State, extra: AxiosInstance
}>(
  'data/fetchComments',
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<Comments>(APIRoute.Comments + id);
    return data;
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
  },
);

export const clearErrorAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch, state: State, extra: AxiosInstance
}>(
  'clearError',
  (_arg, {dispatch, extra: api}) => {
    setTimeout(
      () => dispatch(setErrorMessage(null)),
      TIMEOUT_SHOW_ERROR
    );
  },
);

export const addCommentAction = createAsyncThunk<Comments, PostData, {
  dispatch: AppDispatch, state: State, extra: AxiosInstance
}>(
  'addComment',
  async ({comment, rating, id}, {dispatch, extra: api}) => {
    const {data} = await api.post<Comments>(APIRoute.Comments + id, {comment, rating});
    return data;
  },

);
