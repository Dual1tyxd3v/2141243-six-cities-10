import { AuthorizationStatus } from '../const';
import { store } from '../store/index';
import { Comments, Offer, Offers } from './offer';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
};

export type DataProcess = {
  offers: Offers;
  isLoaded: boolean;
  nearbyOffers: Offers;
  comments: Comments;
  offer: Offer | null;
  postLoaded: boolean;
  favoriteOffers: Offers;
  reloadFavorites: boolean;
};

export type AppProcess = {
  city: string;
  sortBy: string;
  error: string | null;
}

export type ChangeStatusData = {
  id: number;
  status: number;
};

