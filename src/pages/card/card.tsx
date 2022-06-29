import { Link } from 'react-router-dom';

import { useAppSelector } from '../../hooks/hooks';

import { selectProducts } from '../../store/order-slice/order-slice';
import { adaptTypeToClient, getPriceWithSpace } from '../../utils/utils';

function Card(): JSX.Element {
  const products = useAppSelector(selectProducts);

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
        {Object.values(products).map(({ id, previewImg, name, type, vendorCode, stringCount, price, totalPrice }) => {
          const adaptedType = adaptTypeToClient(type);

          return (
            <div className="cart-item" key={id}>
              <button className="cart-item__close-button button-cross" type="button" aria-label="Удалить">
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

              <div className="quantity cart-item__quantity">
                <button className="quantity__button" aria-label="Уменьшить количество">
                  <svg width="8" height="8" aria-hidden="true">
                    <use xlinkHref="#icon-minus"></use>
                  </svg>
                </button>
                <input className="quantity__input" type="number" placeholder="1" id="2-count" name="2-count" max="99" />
                <button className="quantity__button" aria-label="Увеличить количество">
                  <svg width="8" height="8" aria-hidden="true">
                    <use xlinkHref="#icon-plus"></use>
                  </svg>
                </button>
              </div>
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
    </div>
  );
}

export default Card;
