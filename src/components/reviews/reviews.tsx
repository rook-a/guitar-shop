import { useEffect } from 'react';

import Review from '../review/review';
import MoreButton from '../more-button/more-button';
import SubmitButton from '../submit-button/submit-button';
import UpButton from '../up-button/up-button';
import ReviewsModalSuccess from '../modals/reviews-modal-success/reviews-modal-success';
import ReviewsModal from '../modals/reviews-modal/reviews-modal';
import ModalContainer from '../modal-container/modal-container';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { selectGuitar } from '../../store/guitars-slice/guitars-slice';
import {
  fetchCommentsAction,
  selectComments,
  selectCommentsCount,
  selectCurrentComments,
  selectSendCommentStatus,
} from '../../store/comments-slice/comments-slice';
import {
  changeReviewModalActive,
  changeReviewSuccessModalActive,
  selectReviewModalActive,
  selectReviewSuccessModalActive,
} from '../../store/app-slice/app-slice';

import { FetchStatus, START_COUNT_COMMENT } from '../../utils/const';

function Reviews(): JSX.Element {
  const dispatch = useAppDispatch();

  const comments = useAppSelector(selectComments);
  const guitar = useAppSelector(selectGuitar);
  const commentsSort = useAppSelector(selectCurrentComments);
  const commentsCount = useAppSelector(selectCommentsCount);
  const sendCommentStatus = useAppSelector(selectSendCommentStatus);
  const isReviewModalOpen = useAppSelector(selectReviewModalActive);
  const isReviewSuccessModalOpen = useAppSelector(selectReviewSuccessModalActive);
  const isCommentSendFulfilled = sendCommentStatus === FetchStatus.Fulfilled;

  useEffect(() => {
    if (isCommentSendFulfilled) {
      dispatch(fetchCommentsAction(Number(guitar?.id)));

      dispatch(changeReviewModalActive(false));
      dispatch(changeReviewSuccessModalActive(true));
    }
  }, [dispatch, guitar?.id, isCommentSendFulfilled]);

  const handleModalClick = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();

    dispatch(changeReviewModalActive(true));
    document.body.style.overflow = 'hidden';
  };

  return (
    <section className="reviews">
      <h3 className="reviews__title title title--bigger">{comments.length !== 0 ? 'Отзывы' : 'Отзывов нет'}</h3>
      <SubmitButton onModalClick={handleModalClick} />

      {commentsSort.map((comment) => (
        <Review currentComment={comment} key={comment.id} />
      ))}

      {comments.length > commentsCount && <MoreButton />}

      {comments.length > START_COUNT_COMMENT && <UpButton />}

      {isReviewModalOpen && <ModalContainer className={'modal--review'} children={<ReviewsModal />} />}
      {isReviewSuccessModalOpen && <ModalContainer className={'modal--success'} children={<ReviewsModalSuccess />} />}
    </section>
  );
}

export default Reviews;
