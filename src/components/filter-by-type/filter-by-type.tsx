import { ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import { selectGuitarsType, setGuitarsStringCounts, setGuitarsType } from '../../store/filter-slice/filter-slice';
import { fetchGuitarsAction } from '../../store/guitars-slice/guitars-slice';
import { redirectToRoute } from '../../store/middlewares/redirect-action';

import { AppRoute, GuitarStringCountsMap, GuitarsTypeMap, START_PAGE_NUMBER } from '../../utils/const';

function FilterByType(): JSX.Element {
  const { number } = useParams();
  const dispatch = useAppDispatch();
  const guitarsType = useAppSelector(selectGuitarsType);

  const handleTypeChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name } = evt.target;
    const stringCount = [...GuitarStringCountsMap[name as keyof typeof GuitarStringCountsMap]];

    const type = guitarsType.includes(name) ? guitarsType.filter((type) => type !== name) : [...guitarsType, name];

    dispatch(setGuitarsType(type));
    dispatch(setGuitarsStringCounts(stringCount));
    dispatch(
      fetchGuitarsAction({
        activePageNumber: Number(number),
        guitarType: type,
        stringCount,
      }),
    );

    if (Number(number) !== undefined && Number(number) !== START_PAGE_NUMBER) {
      dispatch(redirectToRoute(AppRoute.Root));
    }
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Тип гитар</legend>

      {GuitarsTypeMap.map(({ label, type }) => (
        <div className="form-checkbox catalog-filter__block-item" key={type}>
          <input
            onChange={handleTypeChange}
            className="visually-hidden"
            type="checkbox"
            id={type}
            name={type}
            checked={guitarsType.includes(type)}
          />
          <label htmlFor={type}>{label}</label>
        </div>
      ))}
    </fieldset>
  );
}

export default FilterByType;
