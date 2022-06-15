import { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import qs from 'query-string';

import FilterForm from '../filter-form/filter-form';
import Sorting from '../sorting/sorting';
import ProductCard from '../product-card/product-card';
import CatalogListEmpty from '../catalog-list-empty/catalog-list-empty';
import Pagination from '../pagination/pagination';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import {
  fetchGuitarsAction,
  selectGuitars,
  selectOrderType,
  selectSortType,
} from '../../store/guitars-slice/guitars-slice';
import {
  fetchMinPrice,
  selectguitarsStringCounts,
  selectGuitarsType,
  selectPriceMax,
  selectPriceMin,
} from '../../store/filter-slice/filter-slice';

function CatalogList(): JSX.Element {
  const { number } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isMounted = useRef<boolean>(false);

  const guitars = useAppSelector(selectGuitars);
  const sortType = useAppSelector(selectSortType);
  const orderType = useAppSelector(selectOrderType);
  const guitarMinPrice = useAppSelector(selectPriceMin);
  const guitarMaxPrice = useAppSelector(selectPriceMax);
  const guitarsType = useAppSelector(selectGuitarsType);
  const guitarsStringCounts = useAppSelector(selectguitarsStringCounts);

  const isEmpty = guitars.length === 0;

  useEffect(() => {
    let filter = {};
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const { _sort, _order, price_gte, price_lte, type, stringCount } = params;

      if (_sort !== '' && _sort !== null) {
        filter = { ...filter, sortType: _sort };
      }

      if (_order !== '' && _order !== null) {
        filter = { ...filter, orderType: _order };
      }

      if (price_gte !== '' && price_gte !== null) {
        filter = { ...filter, priceMin: price_gte };
      }

      if (price_lte !== '' && price_lte !== null) {
        filter = { ...filter, priceMax: price_lte };
      }

      if (type?.length !== 0 && type !== null) {
        filter = { ...filter, guitarsType: type };
      }

      if (stringCount?.length !== 0 && stringCount !== null) {
        filter = { ...filter, guitarsStringCounts: stringCount };
      }
    }

    dispatch(fetchGuitarsAction({ activePageNumber: Number(number), ...filter }));
    dispatch(fetchMinPrice());
  }, [dispatch, number]);

  useEffect(() => {
    if (isMounted.current) {
      const query = qs.stringify(
        {
          _sort: sortType,
          _order: orderType,
          price_gte: guitarMinPrice,
          price_lte: guitarMaxPrice,
          type: guitarsType,
          stringCount: guitarsStringCounts,
        },
        { skipNull: true, skipEmptyString: true },
      );

      navigate(`?${query}`);
    }

    isMounted.current = true;
  }, [guitarMaxPrice, guitarMinPrice, guitarsStringCounts, guitarsType, navigate, orderType, sortType]);

  return (
    <div className="catalog">
      <FilterForm />

      <Sorting />

      {isEmpty ? (
        <CatalogListEmpty />
      ) : (
        <div className="cards catalog__cards">
          {guitars.map((guitar) => (
            <ProductCard guitar={guitar} key={guitar.id} />
          ))}
        </div>
      )}

      <Pagination />
    </div>
  );
}

export default CatalogList;
