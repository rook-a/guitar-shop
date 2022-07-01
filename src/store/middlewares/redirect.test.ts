import { configureMockStore } from '@jedmao/redux-mock-store';
import { AnyAction } from 'redux';

import { redirect } from './redirect';
import { redirectToRoute } from './redirect-action';

import { State } from '../../types/state';
import { AppRoute } from '../../utils/const';

const fakeHistory = {
  location: {
    pathname: '',
  },
  push(path: string) {
    this.location.pathname = path;
  },
};

const middlewares = [redirect];
const mockStore = configureMockStore<State, AnyAction>(middlewares);
const store = mockStore();

jest.doMock('../../browser-history', () => fakeHistory);

describe('Middleware: redirect', () => {
  beforeEach(() => {
    fakeHistory.push('');
  });

  it('should be redirect to /catalog/page_1', () => {
    store.dispatch(redirectToRoute(AppRoute.Root));

    expect(store.getActions()).toEqual([redirectToRoute(AppRoute.Root)]);
  });

  it('should not to be redirect /about because bad action', () => {
    store.dispatch({ type: 'UNKNOWN_ACTION', payload: AppRoute.About });

    expect(fakeHistory.location.pathname).not.toBe(AppRoute.About);
  });
});
