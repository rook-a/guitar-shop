import { Link } from 'react-router-dom';
import cn from 'classnames';

import FormSearch from '../form-search/form-search';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { changeCurrentPage, selectCurrentPage } from '../../store/app-slice/app-slice';
import { selectTotalNumberOfProducts } from '../../store/order-slice/order-slice';

import { AppRoute, MenuLabel, MenuLinksMap, START_PAGE_NUMBER as MIN_PRODUCTS_COUNT } from '../../utils/const';

function Header(): JSX.Element {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector(selectCurrentPage);
  const numberOfProductsInCard = useAppSelector(selectTotalNumberOfProducts);

  return (
    <header className="header" id="header">
      <div className="container header__wrapper">
        <Link className="header__logo logo" to={AppRoute.Root}>
          <img className="logo__img" width="70" height="70" src="../../img/svg/logo.svg" alt="Логотип" />
        </Link>
        <nav className="main-nav">
          <ul className="main-nav__list">
            {MenuLinksMap.map(({ label, route }) => (
              <li key={label}>
                <Link
                  className={cn('link', 'main-nav__link', { 'link--current': label === currentPage })}
                  to={route}
                  onClick={() => dispatch(changeCurrentPage(label))}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <FormSearch />

        <Link
          onClick={() => dispatch(changeCurrentPage(MenuLabel.Cart))}
          className="header__cart-link"
          to={AppRoute.Card}
          aria-label="Корзина">
          <svg className="header__cart-icon" width="14" height="14" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>
          <span className="visually-hidden">Перейти в корзину</span>
          {numberOfProductsInCard >= MIN_PRODUCTS_COUNT && (
            <span className="header__cart-count">{numberOfProductsInCard}</span>
          )}
        </Link>
      </div>
    </header>
  );
}

export default Header;
