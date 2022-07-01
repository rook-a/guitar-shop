import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, waitFor } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

import Cart from './cart';
import { mockOrderProduct } from '../../utils/mock';

const mockStore = configureMockStore();

const store = mockStore({
  App: {},
  Comments: {},
  Guitars: {},
  Modal: {
    cartDeleteModalActive: false,
  },
  Order: {
    products: mockOrderProduct,
  },
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
