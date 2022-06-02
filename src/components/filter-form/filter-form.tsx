import FilterByPrice from '../filter-by-price/filter-by-price';
import FilterByType from '../filter-by-type/filter-by-type';
import FilterByStrings from '../filter-by-strings/filter-by-strings';

function FilterForm(): JSX.Element {
  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>

      <FilterByPrice />

      <FilterByType />

      <FilterByStrings />

      <button className="catalog-filter__reset-btn button button--black-border button--medium" type="reset">
        Очистить
      </button>
    </form>
  );
}

export default FilterForm;
