import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { render, waitFor, cleanup } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';

import App from './app';
import HistoryRouter from '../history-router/history-router';

import { AppRoute, MenuLabel } from '../../utils/const';
import { mockComment, mockGuitar, mockOrderProduct, mockProduct } from '../../utils/mock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();

const store = mockStore({
  App: {
    currentPage: MenuLabel.Catalog,
  },
  Comments: {
    comments: [mockComment],
  },
  Guitars: {
    guitars: [mockProduct],
    guitar: mockGuitar,
    guitarsSearch: [],
    sortType: 'price',
    orderType: 'asc',
  },
  Filter: {
    guitarsType: [],
    guitarsStringCounts: [],
  },
  Modal: {},
  Order: {
    products: mockOrderProduct,
  },
});

const fakeComponent = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('App routing', () => {
  afterEach(cleanup);

  it('should render Catalog page when user navigate to "/catalog/page_1?_order=asc&_sort=price"', async () => {
    history.push(`${AppRoute.Catalog}/page_1?_order=asc&_sort=price`);

    const { getByText } = render(fakeComponent);

    await waitFor(() => {
      expect(getByText(/Каталог гитар/i)).toBeInTheDocument();
      expect(getByText(/Фильтр/i)).toBeInTheDocument();
      expect(getByText(/Сортировать:/i)).toBeInTheDocument();
    });
  });

  it('should render Produce page when user navigate to "/product/id"', async () => {
    history.push(`${AppRoute.Product}/1`);

    const { getByText } = render(fakeComponent);

    await waitFor(() => {
      expect(getByText(/Цена:/i)).toBeInTheDocument();
      expect(getByText(/₽/i)).toBeInTheDocument();
      expect(getByText(/Добавить в корзину/i)).toBeInTheDocument();
    });
  });

  it('should render Cart page when user navigate to "/cart"', async () => {
    history.push(AppRoute.Card);

    const { getByText, getByRole } = render(fakeComponent);

    await waitFor(() => {
      expect(getByRole('heading', { level: 1 })).toHaveTextContent(/Корзина/i);
      expect(getByText(/Промокод на скидку/i)).toBeInTheDocument();
      expect(getByText(/Введите свой промокод, если он у вас есть./i)).toBeInTheDocument();
      expect(getByText(/Оформить заказ/i)).toBeInTheDocument();
    });
  });

  it('should render NotFound page when user navigate to unknown route', async () => {
    history.push('/unknown');

    const { getByText } = render(fakeComponent);

    await waitFor(() => {
      expect(getByText(/Простите, такой страницы у нас нет/i)).toBeInTheDocument();
      expect(getByText(/Попробуйте перейти на другую страницу или вернуться на шаг назад/i)).toBeInTheDocument();
    });
  });
});
