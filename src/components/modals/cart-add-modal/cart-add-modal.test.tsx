import { Provider } from 'react-redux';
import { render, waitFor } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

import CartAddModal from './cart-add-modal';
import { mockOrderProduct, mockProduct } from '../../../utils/mock';

const mockStore = configureMockStore();

const store = mockStore({
  Order: {
    products: mockOrderProduct,
    currentAddedProduct: { ...mockProduct, numberOfProducts: 1, totalPrice: 1234 },
  },
});

const fakeComponent = (
  <Provider store={store}>
    <CartAddModal />
  </Provider>
);

describe('component: CartAddModal', () => {
  it('should render correctly', async () => {
    const { getByText, queryByText, getByRole } = render(fakeComponent);

    await waitFor(() => {
      expect(getByRole('heading', { level: 2 })).toHaveTextContent(/Добавить товар в корзину/i);
      expect(getByText(/Артикул:/i));
      expect(getByText(/Цена:/i));
      expect(queryByText(/Добавить в корзину/i));
    });
  });
});
