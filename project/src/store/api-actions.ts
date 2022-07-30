import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { store } from '.';
import { APIRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR } from '../const';
import { dropToken, saveToken } from '../services/token';
import { dropUserInfo, saveUserInfo } from '../services/userInfo';
import { AuthData } from '../types/auth-data';
import { Offers } from '../types/offer';
import { AppDispatch, State } from '../types/state';
import { UserData } from '../types/user-data';
import { loadOffers, setAuthStatus, setDataLoadStatus, setErrorMessage } from './action';

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
