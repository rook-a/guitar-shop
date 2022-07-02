import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, waitFor } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

import ProductQuantity from './product-quantity';
import { mockProduct } from '../../utils/mock';

const mockStore = configureMockStore();

const store = mockStore({
  App: {},
  Comments: {},
  Guitars: {},
  Modal: {},
  Order: {},
});

const fakeComponent = (
  <Provider store={store}>
    <MemoryRouter>
      <ProductQuantity product={{ ...mockProduct, numberOfProducts: 1, totalPrice: 1234 }} />
    </MemoryRouter>
  </Provider>
);

describe('component: ProductQuantity', () => {
  it('should render correctly', async () => {
    const { getByLabelText } = render(fakeComponent);

    await waitFor(() => {
      expect(getByLabelText(/Уменьшить количество/i)).toBeInTheDocument();
      expect(getByLabelText(/Увеличить количество/i)).toBeInTheDocument();
    });
  });
});
