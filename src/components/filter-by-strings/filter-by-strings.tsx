import { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import {
  selectguitarsStringCounts,
  selectGuitarsType,
  setGuitarsStringCounts,
} from '../../store/filter-slice/filter-slice';
import { fetchGuitarsAction } from '../../store/guitars-slice/guitars-slice';
import { GuitarsStringMap } from '../../utils/const';

function FilterByStrings(): JSX.Element {
  const dispatch = useAppDispatch();
  const guitarType = useAppSelector(selectGuitarsType);
  const guitarsStringCounts = useAppSelector(selectguitarsStringCounts);

  const checkDisabled = (count: number) => {
    if (guitarType.length === 0) {
      return false;
    }

    return !guitarsStringCounts.includes(`${count}`);
  };

  const handleStringCountsChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;

    const stringCounts = guitarsStringCounts.includes(value)
      ? guitarsStringCounts.filter((count) => count !== value)
      : [...guitarsStringCounts, value];

    dispatch(setGuitarsStringCounts(stringCounts));
    dispatch(
      fetchGuitarsAction({
        stringCount: stringCounts,
        guitarType,
      }),
    );
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Количество струн</legend>

      {GuitarsStringMap.map(({ id, stringCount }) => (
        <div className="form-checkbox catalog-filter__block-item" key={stringCount}>
          <input
            onChange={handleStringCountsChange}
            className="visually-hidden"
            type="checkbox"
            id={id}
            name={id}
            value={stringCount}
            checked={guitarsStringCounts.includes(`${stringCount}`)}
            disabled={checkDisabled(stringCount)}
          />
          <label htmlFor={id}>{stringCount}</label>
        </div>
      ))}
    </fieldset>
  );
}

export default FilterByStrings;
