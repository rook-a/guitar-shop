import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, waitFor } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

import CouponForm from './coupon-form';
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
      <CouponForm />
    </MemoryRouter>
  </Provider>
);

describe('component: CouponForm', () => {
  it('should render correctly', async () => {
    const { getByText, getByRole, queryByText } = render(fakeComponent);

    await waitFor(() => {
      expect(getByRole('heading', { level: 2 })).toHaveTextContent(/Промокод на скидку/i);
      expect(getByText(/Введите свой промокод, если он у вас есть./i)).toBeInTheDocument();
      expect(queryByText(/Оформить заказ/i));
    });
  });
});
