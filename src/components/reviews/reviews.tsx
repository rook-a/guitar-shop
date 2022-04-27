import Review from '../review/review';
import MoreButton from '../more-button/more-button';
import SubmitButton from '../submit-button/submit-button';
import UpButton from '../up-button/up-button';

import { useAppSelector } from '../../hooks/hooks';
import { selectComments, selectCommentsCount, selectCurrentComments } from '../../store/comments-slice/comments-slice';

import { START_COUNT_COMMENT } from '../../utils/const';

function Reviews(): JSX.Element {
  const comments = useAppSelector(selectComments);
  const commentsSort = useAppSelector(selectCurrentComments);
  const commentsCount = useAppSelector(selectCommentsCount);

  return (
    <section className="reviews">
      <h3 className="reviews__title title title--bigger">{comments.length !== 0 ? 'Отзывы' : 'Отзывов нет'}</h3>
      <SubmitButton />

      {commentsSort.map((comment) => (
        <Review currentComment={comment} key={comment.id} />
      ))}

      {comments.length > commentsCount && <MoreButton />}

      {comments.length > START_COUNT_COMMENT && <UpButton />}
    </section>
  );
}

export default Reviews;
