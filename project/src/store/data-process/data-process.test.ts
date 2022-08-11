import { DataProcess } from '../../types/state';
import { makeFakeComments, makeFakeOffer, makeFakeOffers } from '../../utils/mocks';
import { addCommentAction, changeOfferFavoriteStatusAction, fetchCommentsAction, fetchFavoriteOffersAction, fetchNearbyOffersAction, fetchOfferAction, fetchOffersAction } from '../api-actions';
import { clearFavoriteOffers, dataProcess } from './data-process';

describe('Reducer: data-process', () => {
  let state: DataProcess;

  beforeEach(() => {
    state = {
      offers: [],
      isLoaded: false,
      offer: null,
      comments: [],
      isPostLoaded: false,
      offersNearby: [],
      offersFavorites: [],
      isFavoritesLoading: false,
      isCommentLoaded: false,
    };
  });

  it('should return initial state without additional parameteres', () => {
    expect(dataProcess.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        offers: [],
        isLoaded: false,
        offer: null,
        comments: [],
        isPostLoaded: false,
        offersNearby: [],
        offersFavorites: [],
        isFavoritesLoading: false,
        isCommentLoaded: false,
      });
  });

  it('should reset "offersFavorites" to "[]" when clearFavoriteOffers implement', () => {
    const offersFavorites = makeFakeOffers();

    expect(dataProcess.reducer(state, clearFavoriteOffers()))
      .toEqual({...state, offersFavorites: []});

    expect(dataProcess.reducer({...state, offersFavorites}, clearFavoriteOffers()))
      .toEqual({...state, offersFavorites: []});
  });

  describe('fetchOffersAction tests', () => {
    it('should update "offers" and "isLoaded" when action fulfilled', () => {
      const offers = makeFakeOffers();

      expect(dataProcess.reducer(state, {type: fetchOffersAction.fulfilled.type, payload: offers}))
        .toEqual({...state, offers, isLoaded: false});

      expect(dataProcess.reducer({...state, isLoaded: true}, {type: fetchOffersAction.fulfilled.type, payload: offers}))
        .toEqual({...state, offers, isLoaded: false});
    });

    it('should update "isLoaded" when action rejected', () => {
      expect(dataProcess.reducer(state, {type: fetchOffersAction.rejected.type}))
        .toEqual({...state, isLoaded: false});

      expect(dataProcess.reducer({...state, isLoaded: true}, {type: fetchOffersAction.rejected.type}))
        .toEqual({...state, isLoaded: false});
    });

    it('should update "isLoaded" when action pending', () => {
      expect(dataProcess.reducer(state, {type: fetchOffersAction.pending.type}))
        .toEqual({...state, isLoaded: true});
    });
  });

  describe('fetchOfferAction tests', () => {
    it('should update "offer" and "isLoaded" when action fulfilled', () => {
      const offer = makeFakeOffer();

      expect(dataProcess.reducer(state, {type: fetchOfferAction.fulfilled.type, payload: offer}))
        .toEqual({...state, offer, isLoaded: false});

      expect(dataProcess.reducer({...state, isLoaded: true}, {type: fetchOfferAction.fulfilled.type, payload: offer}))
        .toEqual({...state, offer, isLoaded: false});
    });

    it('should update "isLoaded" when action rejected', () => {
      expect(dataProcess.reducer(state, {type: fetchOfferAction.rejected.type}))
        .toEqual({...state, isLoaded: false});

      expect(dataProcess.reducer({...state, isLoaded: true}, {type: fetchOfferAction.rejected.type}))
        .toEqual({...state, isLoaded: false});
    });

    it('should update "isLoaded" when action pending', () => {
      expect(dataProcess.reducer(state, {type: fetchOfferAction.pending.type}))
        .toEqual({...state, isLoaded: true});
    });
  });

  it('should update "offersNearby" when fetchNearbyOffersAction fulfilled', () => {
    const offers = makeFakeOffers();

    expect(dataProcess.reducer(state, {type: fetchNearbyOffersAction.fulfilled.type, payload: offers}))
      .toEqual({...state, offersNearby: offers});
  });

  it('should update "comments" when "fetchCommentAction" is fulfilled', () => {
    const comments = makeFakeComments();

    expect(dataProcess.reducer(state, {type: fetchCommentsAction.fulfilled.type, payload: comments}))
      .toEqual({...state, comments});
  });

  describe('addCommentAction tests', () => {
    it('should update "comments", "isPostLoaded" and "isCommentLoaded" when action fulfilled', () => {
      const comments = makeFakeComments();

      expect(dataProcess.reducer(state, {type: addCommentAction.fulfilled.type, payload: comments}))
        .toEqual({...state, isPostLoaded: false, isCommentLoaded: true, comments});

      expect(dataProcess.reducer({...state, isPostLoaded: true, isCommentLoaded: false}, {type: addCommentAction.fulfilled.type, payload: comments}))
        .toEqual({...state, isPostLoaded: false, isCommentLoaded: true, comments});
    });

    it('should update "isPostLoaded" and "isCommentLoaded" when action rejected', () => {
      expect(dataProcess.reducer(state, {type: addCommentAction.rejected.type}))
        .toEqual({...state, isPostLoaded: false, isCommentLoaded: false});

      expect(dataProcess.reducer({...state, isPostLoaded: true, isCommentLoaded: true}, {type: addCommentAction.rejected.type}))
        .toEqual({...state, isPostLoaded: false, isCommentLoaded: false});
    });

    it('should update "isPostLoaded" and "isCommentLoaded" when action pending', () => {
      expect(dataProcess.reducer(state, {type: addCommentAction.pending.type}))
        .toEqual({...state, isPostLoaded: true, isCommentLoaded: false});

      expect(dataProcess.reducer({...state, isPostLoaded: true, isCommentLoaded: true}, {type: addCommentAction.pending.type}))
        .toEqual({...state, isPostLoaded: true, isCommentLoaded: false});
    });
  });

  describe('fetchFavoriteOffersAction tests', () => {
    it('should update "offersFavorites" and "isFavoritesLoading" when action fulfilled', () => {
      const offers = makeFakeOffers();

      expect(dataProcess.reducer(state, {type: fetchFavoriteOffersAction.fulfilled.type, payload: offers}))
        .toEqual({...state, offersFavorites: offers, isFavoritesLoading: false});

      expect(dataProcess.reducer({...state, isFavoritesLoading: true}, {type: fetchFavoriteOffersAction.fulfilled.type, payload: offers}))
        .toEqual({...state, offersFavorites: offers, isFavoritesLoading: false});
    });

    it('should update "isFavoritesLoading" when action rejected', () => {
      expect(dataProcess.reducer(state, {type: fetchFavoriteOffersAction.rejected.type}))
        .toEqual({...state, isFavoritesLoading: false});

      expect(dataProcess.reducer({...state, isFavoritesLoading: true}, {type: fetchFavoriteOffersAction.rejected.type}))
        .toEqual({...state, isFavoritesLoading: false});
    });

    it('should update "isFavoritesLoading" when action pending', () => {
      expect(dataProcess.reducer(state, {type: fetchFavoriteOffersAction.pending.type}))
        .toEqual({...state, isFavoritesLoading: true});

      expect(dataProcess.reducer({...state, isFavoritesLoading: true}, {type: fetchFavoriteOffersAction.pending.type}))
        .toEqual({...state, isFavoritesLoading: true});
    });
  });

  it('should update "offers", "offer" and "offersNearby" when changeOfferFavoriteStatusAction fulfilled', () => {
    const offer = makeFakeOffer();
    const offerWithAnotherFavoriteStatus = {...offer, isFavorite: !offer.isFavorite};

    const offersNearbyWithPayloadOffer = [offer];
    const offersNearby = makeFakeOffers();

    expect(dataProcess.reducer(state, {type: changeOfferFavoriteStatusAction.fulfilled.type, payload: offer}))
      .toEqual(state);

    expect(dataProcess.reducer({...state, offer}, {type: changeOfferFavoriteStatusAction.fulfilled.type, payload: offerWithAnotherFavoriteStatus}))
      .toEqual({...state, offer: offerWithAnotherFavoriteStatus});

    expect(dataProcess.reducer({...state, offersNearby: offersNearby}, {type: changeOfferFavoriteStatusAction.fulfilled.type, payload: offerWithAnotherFavoriteStatus}))
      .toEqual({...state, offersNearby});

    expect(dataProcess.reducer({...state, offersNearby: offersNearbyWithPayloadOffer}, {type: changeOfferFavoriteStatusAction.fulfilled.type, payload: offerWithAnotherFavoriteStatus}))
      .toEqual({...state, offersNearby: [offerWithAnotherFavoriteStatus]});

    expect(dataProcess.reducer({...state, offers: offersNearbyWithPayloadOffer}, {type:  changeOfferFavoriteStatusAction.fulfilled.type, payload: offerWithAnotherFavoriteStatus}))
      .toEqual({...state, offers: [offerWithAnotherFavoriteStatus]});
  });
});
