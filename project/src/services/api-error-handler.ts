import { store } from '../store';
import { setErrorMessage } from '../store/app-process/app-process';
import { clearErrorAction } from '../store/api-actions';

export const apiErrorHandler = (message: string) => {
  store.dispatch(setErrorMessage(message));
  store.dispatch(clearErrorAction());
};
