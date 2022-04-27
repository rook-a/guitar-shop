import { useAppSelector } from '../../hooks/hooks';
import { selectGuitars } from '../../store/guitars-slice/guitars-slice';
import Filter from '../filter/filter';
import Pagination from '../pagination/pagination';
import ProductCard from '../product-card/product-card';
import Sorting from '../sorting/sorting';

function CatalogList(): JSX.Element {
  const guitars = useAppSelector(selectGuitars);

  return (
    <div className="catalog">
      <Filter />

      <Sorting />

      <div className="cards catalog__cards">
        {guitars.map((guitar) => (
          <ProductCard guitar={guitar} key={guitar.id} />
        ))}
      </div>

      <Pagination />
    </div>
  );
}

export default CatalogList;
