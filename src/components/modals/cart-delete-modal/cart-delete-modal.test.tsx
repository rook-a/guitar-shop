import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, waitFor } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

import CartDeleteModal from './cart-delete-modal';

import { mockProduct } from '../../../utils/mock';

const mockStore = configureMockStore();

const store = mockStore({
  Order: {
    currentAddedProduct: { ...mockProduct, numberOfProducts: 1, totalPrice: 1234 },
  },
});

const fakeComponent = (
  <Provider store={store}>
    <MemoryRouter>
      <CartDeleteModal />
    </MemoryRouter>
  </Provider>
);

describe('component: CartDeleteModal', () => {
  it('should render correctly', async () => {
    const { getByText, queryByText, getByRole } = render(fakeComponent);

    await waitFor(() => {
      expect(getByRole('heading', { level: 2 })).toHaveTextContent(/Удалить этот товар?/i);
      expect(getByText(/Артикул:/i));
      expect(getByText(/Цена:/i));
      expect(queryByText(/Удалить товар/i));
      expect(queryByText(/Продолжить покупки/i));
    });
  });
});
