import FilterByPrice from '../filter-by-price/filter-by-price';
import FilterByType from '../filter-by-type/filter-by-type';
import FilterByStrings from '../filter-by-strings/filter-by-strings';

import { useAppDispatch } from '../../hooks/hooks';
import { resetFilter } from '../../store/filter-slice/filter-slice';
import { resetSort } from '../../store/guitars-slice/guitars-slice';

function FilterForm(): JSX.Element {
  const dispatch = useAppDispatch();

  const handleResetButtonClick = () => {
    dispatch(resetFilter());
    dispatch(resetSort());
  };

  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>

      <FilterByPrice />
      <FilterByType />
      <FilterByStrings />

      <button
        onClick={handleResetButtonClick}
        className="catalog-filter__reset-btn button button--black-border button--medium"
        type="reset">
        Очистить
      </button>
    </form>
  );
}

export default FilterForm;
