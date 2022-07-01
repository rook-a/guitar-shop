import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, waitFor } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

import Cart from './cart';

const mockStore = configureMockStore();

const store = mockStore({
  App: {},
  Comments: {},
  Guitars: {},
});

const fakeComponent = (
  <Provider store={store}>
    <MemoryRouter>
      <Cart />
    </MemoryRouter>
  </Provider>
);

describe('page: Cart', () => {
  it('should render correctly', async () => {
    const { getByRole } = render(fakeComponent);

    await waitFor(() => {
      expect(getByRole('heading', { level: 1 })).toHaveTextContent(/Корзина/i);
    });
  });
});
