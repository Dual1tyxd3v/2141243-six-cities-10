import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { DataProcess } from '../../types/state';
import { addCommentAction, changeOfferFavoriteStatusAction, fetchCommentsAction, fetchFavoriteOffersAction, fetchNearbyOffersAction, fetchOfferAction, fetchOffersAction } from '../api-actions';

const initialState: DataProcess = {
  offers: [],
  isLoaded: false,
  offer: null,
  comments: [],
  postLoaded: false,
  nearbyOffers: [],
  favoriteOffers: [],
  reloadFavorites: false,
};

export const dataProcess = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isLoaded = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isLoaded = false;
      })
      .addCase(fetchOffersAction.pending, (state) => {
        state.isLoaded = true;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.offer = action.payload;
        state.isLoaded = false;
      })
      .addCase(fetchOfferAction.rejected, (state) => {
        state.isLoaded = false;
      })
      .addCase(fetchOfferAction.pending, (state) => {
        state.isLoaded = true;
      })
      .addCase(fetchNearbyOffersAction.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
      })
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(addCommentAction.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.postLoaded = false;
      })
      .addCase(addCommentAction.rejected, (state) => {
        state.postLoaded = false;
      })
      .addCase(addCommentAction.pending, (state) => {
        state.postLoaded = true;
      })
      .addCase(fetchFavoriteOffersAction.fulfilled, (state, action) => {
        state.favoriteOffers = action.payload;
        state.reloadFavorites = false;
      })
      .addCase(fetchFavoriteOffersAction.rejected, (state) => {
        state.reloadFavorites = false;
      })
      .addCase(fetchFavoriteOffersAction.pending, (state) => {
        state.reloadFavorites = true;
      })
      .addCase(changeOfferFavoriteStatusAction.fulfilled, (state, action) => {
        state.offers.forEach((it) => {
          if (it.id === action.payload.id) {
            it.isFavorite = !it.isFavorite;
          }
        });
      });
  }
});
