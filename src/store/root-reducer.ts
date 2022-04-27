import { combineReducers } from '@reduxjs/toolkit';

import { NameSpace } from '../utils/const';
import { appSlice } from './app-slice/app-slice';
import { commentsSlice } from './comments-slice/comments-slice';
import { guitarsSlice } from './guitars-slice/guitars-slice';

export const rootReducer = combineReducers({
  [NameSpace.App]: appSlice.reducer,
  [NameSpace.Guitars]: guitarsSlice.reducer,
  [NameSpace.Comments]: commentsSlice.reducer,
});
