import { useEffect } from 'react';

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
import { fetchMinPrice } from '../../store/filter-slice/filter-slice';

import { START_PAGE_NUMBER } from '../../utils/const';

function CatalogList(): JSX.Element {
  const dispatch = useAppDispatch();
  const guitars = useAppSelector(selectGuitars);
  const sortType = useAppSelector(selectSortType);
  const orderType = useAppSelector(selectOrderType);
  const isEmpty = guitars.length === 0;

  useEffect(() => {
    dispatch(fetchGuitarsAction({ activePageNumber: START_PAGE_NUMBER, sortType, orderType }));
    dispatch(fetchMinPrice());
  }, [dispatch, orderType, sortType]);

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
