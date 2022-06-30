import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';

import { changeCartDeleteModalActive } from '../../../store/modal-slice/modal-slice';
import { deleteCurrentProduct, selectCurrentAddedProduct } from '../../../store/order-slice/order-slice';

import { adaptTypeToClient, getPriceWithSpace } from '../../../utils/utils';

function CartDeleteModal(): JSX.Element | null {
  const dispatch = useAppDispatch();
  const product = useAppSelector(selectCurrentAddedProduct);

  if (!product) {
    return null;
  }

  const { id, name, previewImg, vendorCode, totalPrice, stringCount, type } = product;
  const adaptedType = adaptTypeToClient(type);

  const handleCloseModalButtonClick = () => {
    dispatch(changeCartDeleteModalActive(false));
  };

  const handleDeleteButtonClick = () => {
    dispatch(deleteCurrentProduct(id));
    dispatch(changeCartDeleteModalActive(false));
  };

  return (
    <div className="modal__content">
      <h2 className="modal__header title title--medium title--red">Удалить этот товар?</h2>
      <div className="modal__info">
        <img
          className="modal__img"
          src={`../../${previewImg}`}
          width="67"
          height="137"
          alt={`${adaptedType} ${name}`}
        />
        <div className="modal__info-wrapper">
          <h3 className="modal__product-name title title--little title--uppercase">
            {adaptedType} {name}
          </h3>
          <p className="modal__product-params modal__product-params--margin-11">Артикул: {vendorCode}</p>
          <p className="modal__product-params">
            {adaptedType}, {stringCount} струнная
          </p>
          <p className="modal__price-wrapper">
            <span className="modal__price">Цена:</span>
            <span className="modal__price">{getPriceWithSpace(totalPrice)} ₽</span>
          </p>
        </div>
      </div>
      <div className="modal__button-container">
        <button onClick={handleDeleteButtonClick} className="button button--small modal__button">
          Удалить товар
        </button>
        <button
          onClick={handleCloseModalButtonClick}
          className="button button--black-border button--small modal__button modal__button--right">
          Продолжить покупки
        </button>
      </div>
      <button
        onClick={handleCloseModalButtonClick}
        className="modal__close-btn button-cross"
        type="button"
        aria-label="Закрыть">
        <span className="button-cross__icon" />
        <span className="modal__close-btn-interactive-area" />
      </button>
    </div>
  );
}

export default CartDeleteModal;
