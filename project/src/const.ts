import { Cities } from './types/offer';

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

export enum APIRoute {
  Offers = '/hotels',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments/',
  Offer = '/hotels/',
}

export const ratingValue = [
  'terribly', 'badly', 'not bad', 'good', 'perfect',
];

export const DEFAULT_MARKER_SRC = 'img/pin.svg';
export const ACTIVE_MARKER_SRC = 'img/pin-active.svg';

export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June','Jule', 'August', 'September', 'October', 'November', 'December',
];

export enum sortMenuTabs {
  Popular = 'Popular',
  PriceLowToHigh = 'Price: low to high',
  PriceHighToLow = 'Price: high to low',
  Rated = 'Top rated first',
}

export const cities: Cities = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export const TIMEOUT_SHOW_ERROR = 3000;

export const MAX_COMMENTS_TO_VIEW = 10;

export const MIN_REVIEW_SYMBOLS = 50;

export enum NameSpace {
  User = 'USER',
  Data = 'DATA',
  Other = 'OTHER'
}
