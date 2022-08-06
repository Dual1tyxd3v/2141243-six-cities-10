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
  Favorite = '/favorite',
}

export const RATING_VALUE = [
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

export const CITIES: Cities = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export const TIMEOUT_SHOW_ERROR = 3000;

export const MAX_COMMENTS_TO_VIEW = 10;

export const MIN_REVIEW_SYMBOLS = 50;
export const MAX_REVIEW_SYMBOLS = 300;

export enum NameSpace {
  User = 'USER',
  Data = 'DATA',
  App = 'APP',
  Other = 'OTHER'
}

export const PASSWORD_REGULAR = /\d\D|\D\d/g;
export const EMAIL_REGULAR = /\w{3}@\D{3}.\D{2}/;
