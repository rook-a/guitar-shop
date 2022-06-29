import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../../hooks/hooks';
import { changeCardAddSuccessModalActive } from '../../../store/modal-slice/modal-slice';

import { AppRoute } from '../../../utils/const';

function CardAddSuccessModal(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleModalClose = () => {
    dispatch(changeCardAddSuccessModalActive(false));
  };

  return (
    <div className="modal__content">
      <svg className="modal__icon" width="26" height="20" aria-hidden="true">
        <use xlinkHref="#icon-success" />
      </svg>
      <p className="modal__message">Товар успешно добавлен в корзину</p>
      <div className="modal__button-container modal__button-container--add">
        <button
          onClick={() => {
            navigate(AppRoute.Card);
            dispatch(changeCardAddSuccessModalActive(false));
          }}
          className="button button--small modal__button">
          Перейти в корзину
        </button>
        <button
          onClick={handleModalClose}
          className="button button--black-border button--small modal__button modal__button--right">
          Продолжить покупки
        </button>
      </div>
      <button onClick={handleModalClose} className="modal__close-btn button-cross" type="button" aria-label="Закрыть">
        <span className="button-cross__icon" />
        <span className="modal__close-btn-interactive-area" />
      </button>
    </div>
  );
}

export default CardAddSuccessModal;
