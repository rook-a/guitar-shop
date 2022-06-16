import { ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import {
  fetchMinPrice,
  selectGuitarsType,
  selectPriceMax,
  selectPriceMin,
  setGuitarsStringCounts,
  setGuitarsType,
} from '../../store/filter-slice/filter-slice';
import { fetchGuitarsAction, selectOrderType, selectSortType } from '../../store/guitars-slice/guitars-slice';
import { redirectToRoute } from '../../store/middlewares/redirect-action';

import { AppRoute, GuitarStringCountsMap, GuitarsTypeMap, START_PAGE_NUMBER } from '../../utils/const';

function FilterByType(): JSX.Element {
  const { number } = useParams();
  const dispatch = useAppDispatch();
  const sortType = useAppSelector(selectSortType);
  const orderType = useAppSelector(selectOrderType);
  const priceMin = useAppSelector(selectPriceMin);
  const priceMax = useAppSelector(selectPriceMax);

  const guitarsType = useAppSelector(selectGuitarsType);

  const getCurrentStringCounts = (types: string[]) => {
    if (types.length === 0) {
      return types;
    }

    const result = types.reduce((acc: string[], item) => {
      const stringCounts = GuitarStringCountsMap[item as keyof typeof GuitarStringCountsMap];

      return [...acc, ...stringCounts];
    }, []);

    return new Set(result);
  };

  const handleTypeChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name } = evt.target;

    const type = guitarsType.includes(name) ? guitarsType.filter((type) => type !== name) : [...guitarsType, name];
    const stringCount = getCurrentStringCounts(type);

    dispatch(setGuitarsType(type));
    dispatch(setGuitarsStringCounts([...stringCount]));
    dispatch(
      fetchGuitarsAction({
        activePageNumber: Number(number),
        guitarType: type,
        stringCount: [...stringCount],
        sortType,
        orderType,
        min: priceMin,
        max: priceMax,
      }),
    );
    dispatch(fetchMinPrice());

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
