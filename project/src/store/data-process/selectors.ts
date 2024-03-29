import { NameSpace } from '../../const';
import { Comments, Offer, Offers } from '../../types/offer';
import { State } from '../../types/state';

export const getOffers = (state: State): Offers => state[NameSpace.Data].offers;
export const getLoadedStatus = (state: State): boolean => state[NameSpace.Data].isLoaded;
export const getOffer = (state: State): Offer => state[NameSpace.Data].offer as Offer;
export const getComments = (state: State): Comments => state[NameSpace.Data].comments;
export const getPostLoadedStatus = (state: State): boolean => state[NameSpace.Data].isPostLoaded;
export const getNearbyOffers = (state: State): Offers => state[NameSpace.Data].offersNearby;
export const getFavoriteOffers = (state: State): Offers => state[NameSpace.Data].offersFavorites;
export const getFavoriteOffersReloadStatus = (state: State) => state[NameSpace.Data].isFavoritesLoading;
export const getCommentPostStatus = (state: State) => state[NameSpace.Data].isCommentLoaded;
