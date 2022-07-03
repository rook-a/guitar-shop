import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { changeCurrentPage, selectCurrentPage } from '../../../store/app-slice/app-slice';
import { changeCartAddSuccessModalActive } from '../../../store/modal-slice/modal-slice';

import { AppRoute, MenuLabel } from '../../../utils/const';

function CartAddSuccessModal(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector(selectCurrentPage);

  const handleModalClose = () => {
    if (currentPage === MenuLabel.Product) {
      navigate(AppRoute.Root);
    }

    dispatch(changeCartAddSuccessModalActive(false));
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
            dispatch(changeCartAddSuccessModalActive(false));
            dispatch(changeCurrentPage(MenuLabel.Cart));
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

export default CartAddSuccessModal;
