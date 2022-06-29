import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { State } from '../../types/state';
import { NameSpace } from '../../utils/const';

interface InitialState {
  reviewModalActive: boolean;
  reviewSuccessModalActive: boolean;

  cardAddModalActive: boolean;
  cardAddSuccessModalActive: boolean;
  cardDeleteModalActive: boolean;
}

const initialState: InitialState = {
  reviewModalActive: false,
  reviewSuccessModalActive: false,

  cardAddModalActive: false,
  cardAddSuccessModalActive: false,
  cardDeleteModalActive: false,
};

export const modalSlice = createSlice({
  name: NameSpace.Modal,
  initialState,
  reducers: {
    changeReviewModalActive: (state, action: PayloadAction<boolean>) => {
      state.reviewModalActive = action.payload;
    },
    changeReviewSuccessModalActive: (state, action: PayloadAction<boolean>) => {
      state.reviewSuccessModalActive = action.payload;
    },
    changeCardAddModalActive: (state, action: PayloadAction<boolean>) => {
      state.cardAddModalActive = action.payload;
    },
    changeCardAddSuccessModalActive: (state, action: PayloadAction<boolean>) => {
      state.cardAddSuccessModalActive = action.payload;
    },
    changeCardDeleteModalActive: (state, action: PayloadAction<boolean>) => {
      state.cardDeleteModalActive = action.payload;
    },
    closeAllModal: () => initialState,
  },
});

export const {
  changeReviewModalActive,
  changeReviewSuccessModalActive,
  changeCardAddModalActive,
  changeCardAddSuccessModalActive,
  changeCardDeleteModalActive,
  closeAllModal,
} = modalSlice.actions;

const selectModalState = (state: State) => state[NameSpace.Modal];

export const selectReviewModalActive = (state: State) => selectModalState(state).reviewModalActive;
export const selectReviewSuccessModalActive = (state: State) => selectModalState(state).reviewSuccessModalActive;
export const selectCardAddModalActive = (state: State) => selectModalState(state).cardAddModalActive;
export const selectCardAddSuccessModalActive = (state: State) => selectModalState(state).cardAddSuccessModalActive;
export const selectCardDeleteModalActive = (state: State) => selectModalState(state).cardDeleteModalActive;
