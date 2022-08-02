import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { DataProcess } from '../../types/state';
import { addCommentAction, fetchCommentsAction, fetchNearbyOffersAction, fetchOfferAction, fetchOffersAction } from '../api-actions';

const initialState: DataProcess = {
  offers: [],
  isLoaded: false,
  offer: null,
  comments: [],
  postLoaded: false,
  nearbyOffers: [],
};

export const dataProcess = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
  },
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
      });
  }
});
