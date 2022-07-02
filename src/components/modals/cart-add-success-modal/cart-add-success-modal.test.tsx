import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, waitFor } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

import CartAddSuccessModal from './cart-add-success-modal';

const mockStore = configureMockStore();

const store = mockStore();

const fakeComponent = (
  <Provider store={store}>
    <MemoryRouter>
      <CartAddSuccessModal />
    </MemoryRouter>
  </Provider>
);

describe('component: CartAddSuccessModal', () => {
  it('should render correctly', async () => {
    const { getByText, queryByText } = render(fakeComponent);

    await waitFor(() => {
      expect(getByText(/Товар успешно добавлен в корзину/i));
      expect(queryByText(/Перейти в корзину/i));
      expect(queryByText(/Продолжить покупки/i));
    });
  });
});
