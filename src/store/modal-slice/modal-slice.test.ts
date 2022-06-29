import { changeReviewModalActive, changeReviewSuccessModalActive, closeAllModal, modalSlice } from './modal-slice';

const state = {
  reviewModalActive: false,
  reviewSuccessModalActive: false,

  cardModalAdd: false,
  cardModalAddSuccess: false,
  cardModalDelete: false,
};

describe('App slice', () => {
  it('without additional parameters should return initial state', () => {
    expect(modalSlice.reducer(void 0, { type: 'unknonw_action' })).toEqual(state);
  });

  it('review modal state should be updated correctly', () => {
    expect(modalSlice.reducer(state, changeReviewModalActive(true))).toEqual({
      ...state,
      reviewModalActive: true,
    });
  });

  it('success modal state should be updated correctly', () => {
    expect(modalSlice.reducer(state, changeReviewSuccessModalActive(true))).toEqual({
      ...state,
      reviewSuccessModalActive: true,
    });
  });

  it('closeAllModal should be return initial state', () => {
    expect(modalSlice.reducer(state, closeAllModal())).toEqual(state);
  });
});
