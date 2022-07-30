import { store } from '../store';
import { setErrorMessage } from '../store/action';

export const apiErrorHandler = (message: string) => {
  store.dispatch(setErrorMessage(message));
};
