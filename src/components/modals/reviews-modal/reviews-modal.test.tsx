import { Provider } from 'react-redux';
import { render, waitFor } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

import ReviewsModal from './reviews-modal';

import { mockGuitar } from '../../../utils/mock';

const mockStore = configureMockStore();

const store = mockStore({
  Comments: { commentsCount: 5, sendCommentStatus: false },
  Guitars: {
    guitar: mockGuitar,
  },
});

const fakeComponent = (
  <Provider store={store}>
    <ReviewsModal />
  </Provider>
);

describe('component: ReviewsModal', () => {
  it('should render correctly', async () => {
    const { getByText, getByLabelText } = render(fakeComponent);

    await waitFor(() => {
      expect(getByText(/Оставить отзыв/i));
      expect(getByText(/Ваша Оценка/i));
      expect(getByLabelText(/Достоинства/i));
      expect(getByLabelText(/Комментарий/i));
    });
  });
});
