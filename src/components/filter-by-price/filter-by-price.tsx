import { ChangeEvent, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { selectPriceMin, selectPriceMax, setPrice } from '../../store/filter-slice/filter-slice';
import { fetchGuitarsAction, selectOrderType, selectSortType } from '../../store/guitars-slice/guitars-slice';

import { getPriceWithSpace } from '../../utils/utils';

function FilterByPrice(): JSX.Element {
  const dispatch = useAppDispatch();

  const sortType = useAppSelector(selectSortType);
  const orderType = useAppSelector(selectOrderType);
  const guitarMinPrice = useAppSelector(selectPriceMin);
  const guitarMaxPrice = useAppSelector(selectPriceMax);
  const placeholderPriceMin = getPriceWithSpace(Number(guitarMinPrice));
  const placeholderPriceMax = getPriceWithSpace(Number(guitarMaxPrice));

  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');

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
      dispatch(fetchGuitarsAction({ sortType, orderType, min: price, max: `${guitarMaxPrice}` }));
      dispatch(
        setPrice({
          priceMin: price,
          priceMax: guitarMaxPrice,
        }),
      );
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
      dispatch(fetchGuitarsAction({ sortType, orderType, max: price, min: currentMinPrice }));
      dispatch(
        setPrice({
          priceMin: currentMinPrice,
          priceMax: price,
        }),
      );
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
