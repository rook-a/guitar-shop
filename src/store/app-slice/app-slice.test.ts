import { appSlice, changeCurrentPage } from './app-slice';

import { MenuLabel } from '../../utils/const';

const state = {
  currentPage: MenuLabel.Catalog,
};

describe('App slice', () => {
  it('without additional parameters should return initial state', () => {
    expect(appSlice.reducer(void 0, { type: 'UNKNOWN_ACTION' })).toEqual(state);
  });

  it('current page should be updated correctly', () => {
    expect(appSlice.reducer(state, changeCurrentPage(MenuLabel.Cart))).toEqual({
      ...state,
      currentPage: MenuLabel.Cart,
    });
  });
});
