import { Link } from 'react-router-dom';
import cn from 'classnames';

import FormSearch from '../form-search/form-search';

import { AppRoute, MenuLinksMap } from '../../utils/const';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { changeCurrentPage, selectCurrentPage } from '../../store/app-slice/app-slice';

function Header(): JSX.Element {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector(selectCurrentPage);

  return (
    <header className="header" id="header">
      <div className="container header__wrapper">
        <Link className="header__logo logo" to={AppRoute.Root}>
          <img className="logo__img" width="70" height="70" src="../../img/svg/logo.svg" alt="Логотип" />
        </Link>
        <nav className="main-nav">
          <ul className="main-nav__list">
            {MenuLinksMap.map(({ label, route }) => (
              <li>
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

        <Link className="header__cart-link" to={AppRoute.Card} aria-label="Корзина">
          <svg className="header__cart-icon" width="14" height="14" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>
          <span className="visually-hidden">Перейти в корзину</span>
          <span className="header__cart-count">2</span>
        </Link>
      </div>
    </header>
  );
}

export default Header;
