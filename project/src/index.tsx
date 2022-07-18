import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { offers } from './mocks/offers';
import { AuthorizationStatus } from './const';

const settings = {
  PLACE_NUMBER: 312,
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App placeNumber={settings.PLACE_NUMBER}
      offers={offers}
      authStatus={AuthorizationStatus.Auth}
    />
  </React.StrictMode>,
);
