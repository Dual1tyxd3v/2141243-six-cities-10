import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { dataProcess } from './dataProcess/dataProcess';
import { reducer } from './reducer';
import { userProcess } from './userProcess/userProcess';

export const rootReducer = combineReducers({
  [NameSpace.Other]: reducer,
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Data]: dataProcess.reducer,
});
