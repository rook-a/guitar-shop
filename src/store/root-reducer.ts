import { combineReducers } from '@reduxjs/toolkit';

import { commentsSlice } from './comments-slice/comments-slice';
import { guitarsSlice } from './guitars-slice/guitars-slice';
import { filterSlice } from './filter-slice/filter-slice';
import { modalSlice } from './modal-slice/modal-slice';
import { orderSlice } from './order-slice/order-slice';
import { appSlice } from './app-slice/app-slice';

import { NameSpace } from '../utils/const';

export const rootReducer = combineReducers({
  [NameSpace.Comments]: commentsSlice.reducer,
  [NameSpace.Guitars]: guitarsSlice.reducer,
  [NameSpace.Filter]: filterSlice.reducer,
  [NameSpace.Modal]: modalSlice.reducer,
  [NameSpace.Order]: orderSlice.reducer,
  [NameSpace.App]: appSlice.reducer,
});
