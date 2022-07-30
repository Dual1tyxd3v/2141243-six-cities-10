import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { comments } from './mocks/offers';
import { store } from './store';
import { Provider } from 'react-redux';
import { checkAuthAction, fetchOfferAction } from './store/api-actions';

store.dispatch(fetchOfferAction());
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        comments={comments}
      />
    </Provider>
  </React.StrictMode>,
);
