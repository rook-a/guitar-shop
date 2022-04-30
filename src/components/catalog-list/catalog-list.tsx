import { useEffect } from 'react';

import Filter from '../filter/filter';
import Sorting from '../sorting/sorting';
import ProductCard from '../product-card/product-card';
import CatalogListEmpty from '../catalog-list-empty/catalog-list-empty';
import Pagination from '../pagination/pagination';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchGuitarsAction, selectGuitars } from '../../store/guitars-slice/guitars-slice';

import { START_PAGE_NUMBER } from '../../utils/const';

function CatalogList(): JSX.Element {
  const dispatch = useAppDispatch();
  const guitars = useAppSelector(selectGuitars);
  const isEmpty = guitars.length === 0;

  useEffect(() => {
    dispatch(fetchGuitarsAction(START_PAGE_NUMBER));
  }, [dispatch]);

  return (
    <div className="catalog">
      <Filter />

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
