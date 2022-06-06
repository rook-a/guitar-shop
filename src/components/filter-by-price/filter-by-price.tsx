import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import qs from 'query-string';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { selectPriceMin, selectPriceMax, setPrice } from '../../store/filter-slice/filter-slice';
import {
  fetchGuitarsAction,
  selectOrderType,
  selectSortType,
  setSortType,
  setorderType,
} from '../../store/guitars-slice/guitars-slice';

import { priceWithSpace } from '../../utils/utils';

function FilterByPrice(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isMounted = useRef<boolean>(false);

  const sortType = useAppSelector(selectSortType);
  const orderType = useAppSelector(selectOrderType);
  const guitarMinPrice = useAppSelector(selectPriceMin);
  const guitarMaxPrice = useAppSelector(selectPriceMax);
  const placeholderPriceMin = priceWithSpace(guitarMinPrice);
  const placeholderPriceMax = priceWithSpace(guitarMaxPrice);

  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const { _sort, _order, price_gte, price_lte } = params;

      dispatch(setSortType(_sort));
      dispatch(setorderType(_order));

      if (price_gte || price_lte) {
        dispatch(
          setPrice({
            priceMin: price_gte || '',
            priceMax: price_lte || '',
          }),
        );
        setMinPrice(`${price_gte || ''}`);
        setMaxPrice(`${price_lte || ''}`);
      }

      dispatch(
        fetchGuitarsAction({
          sortType: `${_sort}`,
          orderType: `${_order}`,
          min: `${price_gte}`,
          max: `${price_lte}`,
        }),
      );
    }
  }, [dispatch]);

  useEffect(() => {
    if (isMounted.current) {
      const query = qs.stringify(
        {
          _sort: sortType,
          _order: orderType,
          price_gte: minPrice,
          price_lte: maxPrice,
        },
        { skipNull: true, skipEmptyString: true },
      );

      navigate(`?${query}`);
    }

    isMounted.current = true;
  }, [maxPrice, minPrice, navigate, orderType, sortType]);

  const handlePriceMinChange = (evt: ChangeEvent<HTMLInputElement>) => {
    let price = evt.target.value;

    if (!price) {
      setMinPrice('');
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
      dispatch(fetchGuitarsAction({ sortType, orderType, min: price, max: `${guitarMaxPrice}` }));
      dispatch(
        setPrice({
          priceMin: price,
          priceMax: `${guitarMaxPrice}`,
        }),
      );
    }
  };

  const handlePriceMaxChange = (evt: ChangeEvent<HTMLInputElement>) => {
    let price = evt.target.value;
    const currentMinPrice = Number(minPrice) > guitarMinPrice ? minPrice : `${guitarMinPrice}`;

    if (!price) {
      setMaxPrice('');
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
