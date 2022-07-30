import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute, AuthorizationStatus } from '../const';
import { saveToken } from '../services/token';
import { AuthData } from '../types/auth-data';
import { Offers } from '../types/offer';
import { AppDispatch, State } from '../types/state';
import { UserData } from '../types/user-data';
import { loadOffers, setAuthStatus, setDataLoadStatus, setUserInfo } from './action';

export const fetchOfferAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch, state: State, extra: AxiosInstance
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Offers>(APIRoute.Offers);
    dispatch(loadOffers(data));
    dispatch(setDataLoadStatus(false));
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
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(setUserInfo(data));
    dispatch(setAuthStatus(AuthorizationStatus.Auth));
  },
);
