import { useAppSelector } from '../../hooks/hooks';
import { selectGuitars } from '../../store/guitars-slice/guitars-slice';
import CatalogListEmpty from '../catalog-list-empty/catalog-list-empty';
import Filter from '../filter/filter';
import Pagination from '../pagination/pagination';
import ProductCard from '../product-card/product-card';
import Sorting from '../sorting/sorting';

function CatalogList(): JSX.Element {
  const guitars = useAppSelector(selectGuitars);
  const isEmpty = guitars.length === 0;

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
