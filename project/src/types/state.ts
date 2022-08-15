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
  offersNearby: Offers;
  comments: Comments;
  offer: Offer | null;
  isPostLoaded: boolean;
  offersFavorites: Offers;
  isFavoritesLoading: boolean;
  isCommentLoaded: boolean;
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

