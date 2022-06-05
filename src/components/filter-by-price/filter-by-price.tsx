import { ChangeEvent, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { selectPriceMin, selectPriceMax } from '../../store/filter-slice/filter-slice';
import { fetchGuitarsAction, selectSortType } from '../../store/guitars-slice/guitars-slice';
import { priceWithSpace } from '../../utils/utils';

function FilterByPrice(): JSX.Element {
  const dispatch = useAppDispatch();
  const sortType = useAppSelector(selectSortType);

  const [searchParams, setSearchParams] = useSearchParams();
  const priceMinQuery = searchParams.get('price_min') || '';
  const priceMaxQuery = searchParams.get('price_max') || '';

  const guitarMinPrice = useAppSelector(selectPriceMin);
  const guitarMaxPrice = useAppSelector(selectPriceMax);
  const placeholderPriceMin = priceWithSpace(guitarMinPrice);
  const placeholderPriceMax = priceWithSpace(guitarMaxPrice);

  const [minPrice, setMinPrice] = useState(priceMinQuery);
  const [maxPrice, setMaxPrice] = useState(priceMaxQuery);

  const handlePriceMinChange = (evt: ChangeEvent<HTMLInputElement>) => {
    let price = evt.target.value;

    if (!price) {
      setMinPrice('');
      setSearchParams({});
      return;
    }

    if (Number(price) < guitarMinPrice) {
      price = `${guitarMinPrice}`;
      setMinPrice(price);
    }

    if (Number(price) > guitarMaxPrice) {
      price = `${guitarMaxPrice}`;
      setMinPrice(price);
    }

    if (price) {
      setSearchParams({
        price_min: `${price}`,
      });

      dispatch(fetchGuitarsAction({ sortType, min: price, max: `${guitarMaxPrice}` }));
    } else {
      setSearchParams({});
    }
  };

  const handlePriceMaxChange = (evt: ChangeEvent<HTMLInputElement>) => {
    let price = evt.target.value;
    const currentMinPrice = Number(minPrice) > guitarMinPrice ? minPrice : `${guitarMinPrice}`;

    if (!price) {
      setMaxPrice('');
      setSearchParams({});
      return;
    }

    if (Number(price) > guitarMaxPrice) {
      price = `${guitarMaxPrice}`;
      setMaxPrice(price);
    }

    if (Number(price) < Number(currentMinPrice)) {
      price = currentMinPrice;
      setMaxPrice(price);
    }

    if (price) {
      setSearchParams({
        price_min: currentMinPrice,
        price_max: price,
      });

      dispatch(fetchGuitarsAction({ sortType, max: price, min: currentMinPrice }));
    } else {
      setSearchParams({});
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
