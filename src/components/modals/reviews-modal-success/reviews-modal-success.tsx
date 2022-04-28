import { useAppDispatch } from '../../../hooks/hooks';
import { changeReviewSuccessModalActive } from '../../../store/app-slice/app-slice';

function ReviewsModalSuccess(): JSX.Element {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(changeReviewSuccessModalActive(false));
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="modal__content">
      <svg className="modal__icon" width="26" height="20" aria-hidden="true">
        <use xlinkHref="#icon-success" />
      </svg>
      <p className="modal__message">Спасибо за ваш отзыв!</p>
      <div className="modal__button-container modal__button-container--review">
        <button onClick={handleClick} className="button button--small modal__button modal__button--review">
          К покупкам!
        </button>
      </div>
      <button onClick={handleClick} className="modal__close-btn button-cross" type="button" aria-label="Закрыть">
        <span className="button-cross__icon" />
        <span className="modal__close-btn-interactive-area" />
      </button>
    </div>
  );
}

export default ReviewsModalSuccess;
