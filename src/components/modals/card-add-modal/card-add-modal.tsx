import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';

import { changeCardAddModalActive, changeCardAddSuccessModalActive } from '../../../store/modal-slice/modal-slice';
import {
  selectCurrentAddedProduct,
  selectProducts,
  setNewProducts,
  setUpdateProducts,
} from '../../../store/order-slice/order-slice';

import { adaptTypeToClient, getPriceWithSpace } from '../../../utils/utils';

function CardAddModal(): JSX.Element | null {
  const dispatch = useAppDispatch();
  const currentAddedProduct = useAppSelector(selectCurrentAddedProduct);
  const products = useAppSelector(selectProducts);

  if (!currentAddedProduct) {
    return null;
  }

  const { id, name, previewImg, vendorCode, price, stringCount, type } = currentAddedProduct;

  const adaptedType = adaptTypeToClient(type);

  const handleAddButtonClick = () => {
    if (id in products) {
      dispatch(setUpdateProducts(currentAddedProduct));
      dispatch(changeCardAddModalActive(false));
      dispatch(changeCardAddSuccessModalActive(true));

      return;
    }

    dispatch(setNewProducts({ [id]: { ...currentAddedProduct, numberOfProducts: 1, totalPrice: price } }));
    dispatch(changeCardAddModalActive(false));
    dispatch(changeCardAddSuccessModalActive(true));
  };

  return (
    <div className="modal__content">
      <h2 className="modal__header title title--medium">Добавить товар в корзину</h2>
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
            <span className="modal__price">{getPriceWithSpace(price)} ₽</span>
          </p>
        </div>
      </div>
      <div className="modal__button-container">
        <button
          onClick={handleAddButtonClick}
          className="button button--red button--big modal__button modal__button--add">
          Добавить в корзину
        </button>
      </div>
      <button
        onClick={() => dispatch(changeCardAddModalActive(false))}
        className="modal__close-btn button-cross"
        type="button"
        aria-label="Закрыть">
        <span className="button-cross__icon" />
        <span className="modal__close-btn-interactive-area" />
      </button>
    </div>
  );
}

export default CardAddModal;
