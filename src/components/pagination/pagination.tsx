import { generatePath, Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchGuitarsAction, selectTotalProductCount } from '../../store/guitars-slice/guitars-slice';
import { AppRoute, MAX_NUMBER_OF_CARDS, START_PAGE_NUMBER } from '../../utils/const';

function Pagination(): JSX.Element {
  const { number } = useParams();
  const dispatch = useAppDispatch();
  const guitarsCount = useAppSelector(selectTotalProductCount);
  const currentPageNumber = Number(number);

  const paginationLinks = Math.ceil(guitarsCount! / MAX_NUMBER_OF_CARDS);
  const links = Array.from({ length: paginationLinks }, (v, k) => k + 1);

  const prevBtnValue = currentPageNumber - 1;
  const nextBtnValue = currentPageNumber + 1;
  const prevPath = generatePath(`${AppRoute.Catalog}/page_:number`, { number: `${prevBtnValue}` });
  const nextPath = generatePath(`${AppRoute.Catalog}/page_:number`, { number: `${nextBtnValue}` });

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        {START_PAGE_NUMBER !== currentPageNumber && (
          <li className="pagination__page pagination__page--prev" id="prev">
            <Link
              className="link pagination__page-link"
              to={prevPath}
              onClick={() => {
                dispatch(fetchGuitarsAction(prevBtnValue));
              }}>
              Назад
            </Link>
          </li>
        )}

        {links.map((linkNumber) => {
          const path = generatePath(`${AppRoute.Catalog}/page_:number`, { number: `${linkNumber}` });

          return (
            <li
              className={`pagination__page ${currentPageNumber === linkNumber && 'pagination__page--active'}`}
              key={linkNumber}>
              <Link
                className="link pagination__page-link"
                to={path}
                onClick={() => dispatch(fetchGuitarsAction(linkNumber))}>
                {linkNumber}
              </Link>
            </li>
          );
        })}

        {paginationLinks !== currentPageNumber && (
          <li className="pagination__page pagination__page--next" id="next">
            <Link
              className="link pagination__page-link"
              to={nextPath}
              onClick={() => {
                dispatch(fetchGuitarsAction(nextBtnValue));
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
