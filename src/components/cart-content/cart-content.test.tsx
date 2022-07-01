import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, waitFor } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

import CartContent from './cart-content';

const mockStore = configureMockStore();

const store = mockStore({
  App: {},
  Comments: {},
  Guitars: {},
});

const fakeComponent = (
  <Provider store={store}>
    <MemoryRouter>
      <CartContent />
    </MemoryRouter>
  </Provider>
);

describe('component: CartContent', () => {
  it('should render correctly', async () => {
    const { getByText, getByRole, queryByText } = render(fakeComponent);

    await waitFor(() => {
      expect(getByRole('heading', { level: 2 })).toHaveTextContent(/Промокод на скидку/i);
      expect(getByText(/Введите свой промокод, если он у вас есть./i)).toBeInTheDocument();
      expect(queryByText(/Оформить заказ/i));
    });
  });
});
