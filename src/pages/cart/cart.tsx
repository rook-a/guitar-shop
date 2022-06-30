import { Link } from 'react-router-dom';

import ModalContainer from '../../components/modal-container/modal-container';
import CartDeleteModal from '../../components/modals/cart-delete-modal/cart-delete-modal';
import ProductQuantity from '../../components/product-quantity/product-quantity';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { changeCartDeleteModalActive, selectCartDeleteModalActive } from '../../store/modal-slice/modal-slice';

import { selectProducts, setCurrentAddedProduct } from '../../store/order-slice/order-slice';

import { adaptTypeToClient, getPriceWithSpace } from '../../utils/utils';

function Card(): JSX.Element {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const isCartDeleteModalOpen = useAppSelector(selectCartDeleteModalActive);

  return (
    <div className="container">
      <h1 className="title title--bigger page-content__title">Корзина</h1>
      <ul className="breadcrumbs page-content__breadcrumbs page-content__breadcrumbs--on-cart-page">
        <li className="breadcrumbs__item">
          <Link className="link" to="/">
            Главная
          </Link>
        </li>
        <li className="breadcrumbs__item">
          <Link className="link" to="/">
            Каталог
          </Link>
        </li>
        <li className="breadcrumbs__item">
          <Link className="link" to="/">
            Корзина
          </Link>
        </li>
      </ul>
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
          <div className="cart__coupon coupon">
            <h2 className="title title--little coupon__title">Промокод на скидку</h2>
            <p className="coupon__info">Введите свой промокод, если он у вас есть.</p>
            <form className="coupon__form" id="coupon-form" method="post" action="/">
              <div className="form-input coupon__input">
                <label className="visually-hidden">Промокод</label>
                <input type="text" placeholder="Введите промокод" id="coupon" name="coupon" />
                <p className="form-input__message form-input__message--success">Промокод принят</p>
              </div>
              <button className="button button--big coupon__button">Применить</button>
            </form>
          </div>
          <div className="cart__total-info">
            <p className="cart__total-item">
              <span className="cart__total-value-name">Всего:</span>
              <span className="cart__total-value">52 000 ₽</span>
            </p>
            <p className="cart__total-item">
              <span className="cart__total-value-name">Скидка:</span>
              <span className="cart__total-value cart__total-value--bonus">- 3000 ₽</span>
            </p>
            <p className="cart__total-item">
              <span className="cart__total-value-name">К оплате:</span>
              <span className="cart__total-value cart__total-value--payment">49 000 ₽</span>
            </p>
            <button className="button button--red button--big cart__order-button">Оформить заказ</button>
          </div>
        </div>
      </div>

      {isCartDeleteModalOpen && <ModalContainer children={<CartDeleteModal />} />}
    </div>
  );
}

export default Card;
