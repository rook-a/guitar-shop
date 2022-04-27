import { combineReducers } from '@reduxjs/toolkit';

import { NameSpace } from '../utils/const';
import { commentsSlice } from './comments-slice/comments-slice';
import { guitarsSlice } from './guitars-slice/guitars-slice';

export const rootReducer = combineReducers({
  [NameSpace.Guitars]: guitarsSlice.reducer,
  [NameSpace.Comments]: commentsSlice.reducer,
});
