import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import HistoryRouter from '../history-router/history-router';

import FilterByType from './filter-by-type';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();

const store = mockStore({
  App: {},
  Comments: {},
  Guitars: {},
  Filter: {
    guitarsType: [],
    guitarsStringCounts: [],
  },
});

const fakeComponent = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <FilterByType />
    </HistoryRouter>
  </Provider>
);

describe('component: FilterByType', () => {
  it('should render correctly', async () => {
    const { getByText } = render(fakeComponent);

    await waitFor(() => {
      expect(getByText(/Тип гитар/i));
    });
  });
});
