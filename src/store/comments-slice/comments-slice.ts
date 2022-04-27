import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { handleError } from '../../services/handle-error';

import { APIRoute, FetchStatus, NameSpace, START_COUNT_COMMENT } from '../../utils/const';

import { AppDispatch, State } from '../../types/state';

import { Comment } from '../../types/comment';

interface InitialState {
  comments: Comment[];
  commentsStatus: FetchStatus;
  commentsError: boolean;

  commentsCount: number;
}

const initialState: InitialState = {
  comments: [],
  commentsStatus: FetchStatus.Idle,
  commentsError: false,

  commentsCount: START_COUNT_COMMENT,
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
  reducers: {
    updateCommentsCounter: (state) => {
      state.commentsCount += START_COUNT_COMMENT;
    },
    resetCommentsCounter: (state) => {
      state.commentsCount = START_COUNT_COMMENT;
    },
  },
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

export const { updateCommentsCounter, resetCommentsCounter } = commentsSlice.actions;

const selectCommentsState = (state: State) => state[NameSpace.Comments];

export const selectComments = (state: State) => selectCommentsState(state).comments;
export const selectCommentsCount = (state: State) => selectCommentsState(state).commentsCount;

export const selectCurrentComments = createSelector(selectComments, selectCommentsCount, (comments, count) => {
  return comments
    .slice()
    .sort((a, b) => {
      const dateA = Date.parse(a.createAt);
      const dateB = Date.parse(b.createAt);

      return dateB - dateA;
    })
    .slice(0, count);
});
