import { ChangeEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import {
  selectPriceMin,
  selectPriceMax,
  setPrice,
  selectResetFilterStatus,
  selectguitarsStringCounts,
  selectGuitarsType,
} from '../../store/filter-slice/filter-slice';
import { fetchGuitarsAction, selectOrderType, selectSortType } from '../../store/guitars-slice/guitars-slice';
import { redirectToRoute } from '../../store/middlewares/redirect-action';

import { START_PAGE_NUMBER, AppRoute } from '../../utils/const';
import { getPriceWithSpace } from '../../utils/utils';

function FilterByPrice(): JSX.Element {
  const { number } = useParams();
  const dispatch = useAppDispatch();

  const sortType = useAppSelector(selectSortType);
  const orderType = useAppSelector(selectOrderType);
  const guitarMinPrice = useAppSelector(selectPriceMin);
  const guitarMaxPrice = useAppSelector(selectPriceMax);
  const resetFilterStatus = useAppSelector(selectResetFilterStatus);
  const guitarType = useAppSelector(selectGuitarsType);
  const guitarsStringCounts = useAppSelector(selectguitarsStringCounts);

  const placeholderPriceMin = getPriceWithSpace(Number(guitarMinPrice));
  const placeholderPriceMax = getPriceWithSpace(Number(guitarMaxPrice));

  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');

  useEffect(() => {
    if (resetFilterStatus) {
      setMinPrice('');
      setMaxPrice('');
    }
  }, [resetFilterStatus]);

  const handlePriceMinChange = (evt: ChangeEvent<HTMLInputElement>) => {
    let price = evt.target.value;

    if (!price) {
      setMinPrice('');
      return;
    }

    if (Number(price) < Number(guitarMinPrice)) {
      price = `${guitarMinPrice}`;
      setMinPrice(price);
    }

    if (Number(price) > Number(guitarMaxPrice)) {
      price = `${guitarMaxPrice}`;
      setMinPrice(price);
    }

    if (price) {
      dispatch(
        fetchGuitarsAction({
          activePageNumber: Number(number),
          sortType,
          orderType,
          min: price,
          max: `${guitarMaxPrice}`,
          guitarType,
          stringCount: guitarsStringCounts,
        }),
      );
      dispatch(
        setPrice({
          priceMin: price,
          priceMax: guitarMaxPrice,
        }),
      );
    }

    if (Number(number) !== undefined && Number(number) !== START_PAGE_NUMBER) {
      dispatch(redirectToRoute(AppRoute.Root));
    }
  };

  const handlePriceMaxChange = (evt: ChangeEvent<HTMLInputElement>) => {
    let price = evt.target.value;
    const currentMinPrice = Number(minPrice) > Number(guitarMinPrice) ? minPrice : `${guitarMinPrice}`;

    if (!price) {
      setMaxPrice('');
      return;
    }

    if (Number(price) > Number(guitarMaxPrice)) {
      price = `${guitarMaxPrice}`;
      setMaxPrice(price);
    }

    if (Number(price) < Number(currentMinPrice)) {
      price = currentMinPrice;
      setMaxPrice(price);
    }

    if (price) {
      dispatch(
        fetchGuitarsAction({
          activePageNumber: Number(number),
          sortType,
          orderType,
          max: price,
          min: currentMinPrice,
          guitarType,
          stringCount: guitarsStringCounts,
        }),
      );
      dispatch(
        setPrice({
          priceMin: currentMinPrice,
          priceMax: price,
        }),
      );
    }

    if (Number(number) !== undefined && Number(number) !== START_PAGE_NUMBER) {
      dispatch(redirectToRoute(AppRoute.Root));
    }
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="form-input">
          <label className="visually-hidden">Минимальная цена</label>
          <input
            value={minPrice}
            onBlur={handlePriceMinChange}
            onChange={(evt) => setMinPrice(evt.target.value)}
            type="number"
            placeholder={placeholderPriceMin}
            id="priceMin"
            name="от"
          />
        </div>
        <div className="form-input">
          <label className="visually-hidden">Максимальная цена</label>
          <input
            value={maxPrice}
            onBlur={handlePriceMaxChange}
            onChange={(evt) => setMaxPrice(evt.target.value)}
            type="number"
            placeholder={placeholderPriceMax}
            id="priceMax"
            name="до"
          />
        </div>
      </div>
    </fieldset>
  );
}

export default FilterByPrice;
