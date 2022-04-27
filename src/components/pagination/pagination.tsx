import { generatePath, Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { changePaginationPage, selectCurrentPaginationPage } from '../../store/app-slice/app-slice';
import { selectGuitars } from '../../store/guitars-slice/guitars-slice';
import { AppRoute, MAX_NUMBER_OF_CARDS, START_PAGE_NUMBER } from '../../utils/const';

function Pagination(): JSX.Element {
  const { number } = useParams();
  const dispatch = useAppDispatch();
  const guitars = useAppSelector(selectGuitars);
  const currentPaginationPage = useAppSelector(selectCurrentPaginationPage);

  const currentPageNumber = Number(number);
  const paginationLinks = Math.ceil(guitars.length / MAX_NUMBER_OF_CARDS);
  const links = Array.from({ length: paginationLinks }, (v, k) => k + 1);

  const prevPath = generatePath(AppRoute.Catalog, { number: `${currentPageNumber - 1}` });
  const nextPath = generatePath(AppRoute.Catalog, { number: `${currentPageNumber + 1}` });

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        {START_PAGE_NUMBER !== currentPaginationPage && (
          <li className="pagination__page pagination__page--prev" id="prev">
            <Link
              className="link pagination__page-link"
              to={prevPath}
              onClick={() => {
                dispatch(changePaginationPage(currentPaginationPage - 1));
              }}>
              Назад
            </Link>
          </li>
        )}

        {links.map((linkNumber) => {
          const path = generatePath(AppRoute.Catalog, { number: `${linkNumber}` });

          return (
            <li
              className={`pagination__page ${currentPaginationPage === linkNumber && 'pagination__page--active'}`}
              key={linkNumber}>
              <Link
                className="link pagination__page-link"
                to={path}
                onClick={() => dispatch(changePaginationPage(linkNumber))}>
                {linkNumber}
              </Link>
            </li>
          );
        })}

        {paginationLinks !== currentPaginationPage && (
          <li className="pagination__page pagination__page--next" id="next">
            <Link
              className="link pagination__page-link"
              to={nextPath}
              onClick={() => {
                dispatch(changePaginationPage(currentPaginationPage + 1));
              }}>
              Далее
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Pagination;
