import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import HistoryRouter from '../history-router/history-router';

import FilterForm from './filter-form';

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
      <FilterForm />
    </HistoryRouter>
  </Provider>
);

describe('component: Filter', () => {
  it('should render correctly', async () => {
    const { getByText, getByRole } = render(fakeComponent);

    await waitFor(() => {
      expect(getByText(/Фильтр/i));
      expect(getByText(/Цена, ₽/i));
      expect(getByText(/Тип гитар/i));
      expect(getByText(/Количество струн/i));
      expect(getByRole('button')).toHaveTextContent(/Очистить/i);
    });
  });
});
