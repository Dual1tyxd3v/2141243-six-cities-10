import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { apiErrorHandler } from './apiErrorHandler';
import { getToken } from './token';

const BASE_URL = 'https://10.react.pages.academy/six-cities';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT
  });

  api.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = getToken();

    if (token) {
      config.headers['x-token'] = token;
    }

    return config;
  });

  api.interceptors.response.use((response) => response, (error: AxiosError) => {
    if (error.response) {
      apiErrorHandler(error.response.data.error);
    }

    throw error;
  });
  return api;
};
