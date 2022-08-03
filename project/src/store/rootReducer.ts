import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { appProcess } from './appProcess/appProcess';
import { dataProcess } from './dataProcess/dataProcess';
import { userProcess } from './userProcess/userProcess';

export const rootReducer = combineReducers({
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Data]: dataProcess.reducer,
  [NameSpace.App]: appProcess.reducer,
});
