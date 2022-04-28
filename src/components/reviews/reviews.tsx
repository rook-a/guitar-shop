import { useEffect, useState } from 'react';

import Review from '../review/review';
import MoreButton from '../more-button/more-button';
import SubmitButton from '../submit-button/submit-button';
import UpButton from '../up-button/up-button';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import {
  fetchCommentsAction,
  selectComments,
  selectCommentsCount,
  selectCurrentComments,
  selectSendCommentStatus,
} from '../../store/comments-slice/comments-slice';

import { FetchStatus, START_COUNT_COMMENT } from '../../utils/const';
import ReviewsModal from '../reviews-modal/reviews-modal';
import { selectGuitar } from '../../store/guitars-slice/guitars-slice';

function Reviews(): JSX.Element {
  const dispatch = useAppDispatch();
  const [isModalActive, setisModalActive] = useState(false);

  const comments = useAppSelector(selectComments);
  const guitar = useAppSelector(selectGuitar);
  const commentsSort = useAppSelector(selectCurrentComments);
  const commentsCount = useAppSelector(selectCommentsCount);
  const sendCommentStatus = useAppSelector(selectSendCommentStatus);
  const isCommentSendFulfilled = sendCommentStatus === FetchStatus.Fulfilled;

  useEffect(() => {
    const handleModalCloseKeydowm = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        setisModalActive(false);
        document.body.style.overflow = 'auto';
      }
    };

    if (isCommentSendFulfilled) {
      setisModalActive(false);
      document.body.style.overflow = 'auto';

      dispatch(fetchCommentsAction(Number(guitar?.id)));
    }

    document.addEventListener('keydown', handleModalCloseKeydowm);

    return () => {
      document.removeEventListener('keydown', handleModalCloseKeydowm);
    };
  }, [dispatch, guitar?.id, isCommentSendFulfilled, isModalActive]);

  const handleModalClick = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();

    setisModalActive(!isModalActive);
    document.body.style.overflow = 'hidden';
  };

  const handleModalCloseClick = () => {
    setisModalActive(!isModalActive);
    document.body.style.overflow = 'auto';
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

      {isModalActive && <ReviewsModal className={'is-active'} onModalCloseClick={handleModalCloseClick} />}
    </section>
  );
}

export default Reviews;
