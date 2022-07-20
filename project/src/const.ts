export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Room = '/offer/:id',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const ratingValue = [
  'terribly', 'badly', 'not bad', 'good', 'perfect',
];

export const DEFAULT_MARKER_SRC = 'img/pin.svg';
export const ACTIVE_MARKER_SRC = 'img/pin-active.svg';
