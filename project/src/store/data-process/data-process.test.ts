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
      reloadFavorites: false,
      commentPostStatus: false,
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
        reloadFavorites: false,
        commentPostStatus: false,
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
    it('should update "comments", "isPostLoaded" and "commentPostStatus" when action fulfilled', () => {
      const comments = makeFakeComments();

      expect(dataProcess.reducer(state, {type: addCommentAction.fulfilled.type, payload: comments}))
        .toEqual({...state, isPostLoaded: false, commentPostStatus: true, comments});

      expect(dataProcess.reducer({...state, isPostLoaded: true, commentPostStatus: false}, {type: addCommentAction.fulfilled.type, payload: comments}))
        .toEqual({...state, isPostLoaded: false, commentPostStatus: true, comments});
    });

    it('should update "isPostLoaded" and "commentPostStatus" when action rejected', () => {
      expect(dataProcess.reducer(state, {type: addCommentAction.rejected.type}))
        .toEqual({...state, isPostLoaded: false, commentPostStatus: false});

      expect(dataProcess.reducer({...state, isPostLoaded: true, commentPostStatus: true}, {type: addCommentAction.rejected.type}))
        .toEqual({...state, isPostLoaded: false, commentPostStatus: false});
    });

    it('should update "isPostLoaded" and "commentPostStatus" when action pending', () => {
      expect(dataProcess.reducer(state, {type: addCommentAction.pending.type}))
        .toEqual({...state, isPostLoaded: true, commentPostStatus: false});

      expect(dataProcess.reducer({...state, isPostLoaded: true, commentPostStatus: true}, {type: addCommentAction.pending.type}))
        .toEqual({...state, isPostLoaded: true, commentPostStatus: false});
    });
  });

  describe('fetchFavoriteOffersAction tests', () => {
    it('should update "offersFavorites" and "reloadFavorites" when action fulfilled', () => {
      const offers = makeFakeOffers();

      expect(dataProcess.reducer(state, {type: fetchFavoriteOffersAction.fulfilled.type, payload: offers}))
        .toEqual({...state, offersFavorites: offers, reloadFavorites: false});

      expect(dataProcess.reducer({...state, reloadFavorites: true}, {type: fetchFavoriteOffersAction.fulfilled.type, payload: offers}))
        .toEqual({...state, offersFavorites: offers, reloadFavorites: false});
    });

    it('should update "reloadFavorites" when action rejected', () => {
      expect(dataProcess.reducer(state, {type: fetchFavoriteOffersAction.rejected.type}))
        .toEqual({...state, reloadFavorites: false});

      expect(dataProcess.reducer({...state, reloadFavorites: true}, {type: fetchFavoriteOffersAction.rejected.type}))
        .toEqual({...state, reloadFavorites: false});
    });

    it('should update "reloadFavorites" when action pending', () => {
      expect(dataProcess.reducer(state, {type: fetchFavoriteOffersAction.pending.type}))
        .toEqual({...state, reloadFavorites: true});

      expect(dataProcess.reducer({...state, reloadFavorites: true}, {type: fetchFavoriteOffersAction.pending.type}))
        .toEqual({...state, reloadFavorites: true});
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
