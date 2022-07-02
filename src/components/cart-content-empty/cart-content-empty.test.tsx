import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, waitFor } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

import CartContentEmpty from './cart-content-empty';
import { mockOrderProduct } from '../../utils/mock';

const mockStore = configureMockStore();

const store = mockStore({
  App: {},
  Comments: {},
  Guitars: {},
  Modal: {},
  Order: {
    products: mockOrderProduct,
  },
});

const fakeComponent = (
  <Provider store={store}>
    <MemoryRouter>
      <CartContentEmpty />
    </MemoryRouter>
  </Provider>
);

describe('component: CartContentEmpty', () => {
  it('should render correctly', async () => {
    const { getByRole } = render(fakeComponent);

    await waitFor(() => {
      expect(getByRole('heading', { level: 2 })).toHaveTextContent(/Корзина пуста/i);
    });
  });
});
