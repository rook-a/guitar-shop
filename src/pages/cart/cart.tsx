import { Link } from 'react-router-dom';
import cn from 'classnames';

import ModalContainer from '../../components/modal-container/modal-container';
import CartDeleteModal from '../../components/modals/cart-delete-modal/cart-delete-modal';
import CartContent from '../../components/cart-content/cart-content';
import CartContentEmpty from '../../components/cart-content-empty/cart-content-empty';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import { selectCartDeleteModalActive } from '../../store/modal-slice/modal-slice';
import { selectTotalNumberOfProducts } from '../../store/order-slice/order-slice';
import { changeCurrentPage } from '../../store/app-slice/app-slice';

import { MenuLabel } from '../../utils/const';

import styles from './cart.module.css';

function Card(): JSX.Element {
  const dispatch = useAppDispatch();
  const isCartDeleteModalOpen = useAppSelector(selectCartDeleteModalActive);
  const numberOfProductsInCart = useAppSelector(selectTotalNumberOfProducts);

  return (
    <div className="container">
      <h1 className="title title--bigger page-content__title">Корзина</h1>
      <ul
        className={cn('breadcrumbs', 'page-content__breadcrumbs', 'page-content__breadcrumbs--on-cart-page', {
          [styles.mb]: !numberOfProductsInCart,
        })}>
        <li className="breadcrumbs__item">
          <Link className="link" to="/">
            Главная
          </Link>
        </li>
        <li className="breadcrumbs__item">
          <Link className="link" to="/" onClick={() => dispatch(changeCurrentPage(MenuLabel.Catalog))}>
            Каталог
          </Link>
        </li>
        <li className="breadcrumbs__item">
          <Link className="link" to="/">
            Корзина
          </Link>
        </li>
      </ul>

      {numberOfProductsInCart ? <CartContent /> : <CartContentEmpty />}

      {isCartDeleteModalOpen && <ModalContainer children={<CartDeleteModal />} />}
    </div>
  );
}

export default Card;
