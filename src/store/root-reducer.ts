import { combineReducers } from '@reduxjs/toolkit';

import { modalSlice } from './modal-slice/modal-slice';
import { commentsSlice } from './comments-slice/comments-slice';
import { guitarsSlice } from './guitars-slice/guitars-slice';
import { filterSlice } from './filter-slice/filter-slice';

import { NameSpace } from '../utils/const';

export const rootReducer = combineReducers({
  [NameSpace.App]: modalSlice.reducer,
  [NameSpace.Guitars]: guitarsSlice.reducer,
  [NameSpace.Comments]: commentsSlice.reducer,
  [NameSpace.Filter]: filterSlice.reducer,
});
