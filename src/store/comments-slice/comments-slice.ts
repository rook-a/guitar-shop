import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { handleError } from '../../services/handle-error';

import { APIRoute, FetchStatus, NameSpace } from '../../utils/const';

import { AppDispatch, State } from '../../types/state';

import { Comment } from '../../types/comment';

interface InitialState {
  comments: Comment[];
  commentsStatus: FetchStatus;
  commentsError: boolean;
}

const initialState: InitialState = {
  comments: [],
  commentsStatus: FetchStatus.Idle,
  commentsError: false,
};

export const fetchCommentsAction = createAsyncThunk<
  Comment[],
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchComments', async (id: number, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<Comment[]>(`${APIRoute.Guitars}/${id}${APIRoute.Comment}`);

    return data;
  } catch (error) {
    handleError(error);
    throw error;
  }
});

export const commentsSlice = createSlice({
  name: NameSpace.Comments,
  initialState,
  reducers: {},
  extraReducers: (buider) => {
    buider
      .addCase(fetchCommentsAction.pending, (state) => {
        state.commentsStatus = FetchStatus.Pending;
      })
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.commentsStatus = FetchStatus.Fulfilled;
      })
      .addCase(fetchCommentsAction.rejected, (state) => {
        state.commentsStatus = FetchStatus.Rejected;
        state.commentsError = true;
      });
  },
});

const selectCommentsState = (state: State) => state[NameSpace.Comments];

export const selectComments = (state: State) => selectCommentsState(state).comments;
