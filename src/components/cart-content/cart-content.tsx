import cn from 'classnames';

import CouponForm from '../coupon-form/coupon-form';
import ProductQuantity from '../product-quantity/product-quantity';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import { changeCartDeleteModalActive } from '../../store/modal-slice/modal-slice';
import {
  selectProducts,
  selectDiscountValue,
  selectProductsTotalPrice,
  setCurrentAddedProduct,
} from '../../store/order-slice/order-slice';

import { adaptTypeToClient, getPriceWithSpace } from '../../utils/utils';

function CartContent(): JSX.Element {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const discountValue = useAppSelector(selectDiscountValue);
  const productsTotalPrice = useAppSelector(selectProductsTotalPrice);

  return (
    <div className="cart">
      {Object.values(products).map((product) => {
        const { id, previewImg, name, type, vendorCode, stringCount, price, totalPrice } = product;
        const adaptedType = adaptTypeToClient(type);

        return (
          <div className="cart-item" key={id}>
            <button
              onClick={() => {
                dispatch(changeCartDeleteModalActive(true));
                dispatch(setCurrentAddedProduct(product));
              }}
              className="cart-item__close-button button-cross"
              type="button"
              aria-label="Удалить">
              <span className="button-cross__icon" />
              <span className="cart-item__close-button-interactive-area" />
            </button>
            <div className="cart-item__image">
              <img src={`../../${previewImg}`} width="55" height="130" alt={`${adaptedType} ${name}`} />
            </div>
            <div className="product-info cart-item__info">
              <p className="product-info__title">
                {adaptedType} {name}
              </p>
              <p className="product-info__info">Артикул: {vendorCode}</p>
              <p className="product-info__info">
                {adaptedType}, {stringCount} струнная
              </p>
            </div>
            <div className="cart-item__price">{getPriceWithSpace(price)} ₽</div>

            <ProductQuantity product={product} />

            <div className="cart-item__price-total">{getPriceWithSpace(totalPrice)} ₽</div>
          </div>
        );
      })}

      <div className="cart__footer">
        <CouponForm />

        <div className="cart__total-info">
          <p className="cart__total-item">
            <span className="cart__total-value-name">Всего:</span>
            <span className="cart__total-value">{getPriceWithSpace(productsTotalPrice)} ₽</span>
          </p>
          <p className="cart__total-item">
            <span className="cart__total-value-name">Скидка:</span>
            <span className={cn('cart__total-value', { 'cart__total-value--bonus': Boolean(discountValue) })}>
              {Boolean(discountValue) && '-'} {getPriceWithSpace(discountValue)} ₽
            </span>
          </p>
          <p className="cart__total-item">
            <span className="cart__total-value-name">К оплате:</span>
            <span className="cart__total-value cart__total-value--payment">
              {getPriceWithSpace(productsTotalPrice - discountValue)} ₽
            </span>
          </p>
          <button className="button button--red button--big cart__order-button">Оформить заказ</button>
        </div>
      </div>
    </div>
  );
}

export default CartContent;
