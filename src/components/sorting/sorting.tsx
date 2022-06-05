import cn from 'classnames';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import {
  changeOrderType,
  changeSortType,
  fetchGuitarsAction,
  selectOrderType,
  selectSortType,
} from '../../store/guitars-slice/guitars-slice';
import { OrderType, SortTypeMap } from '../../utils/const';

function Sorting(): JSX.Element {
  const dispatch = useAppDispatch();
  const sortType = useAppSelector(selectSortType);
  const currentOrderType = useAppSelector(selectOrderType);

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        {SortTypeMap.map(({ type, label }) => (
          <button
            onClick={() => {
              dispatch(fetchGuitarsAction({ orderType: currentOrderType, sortType: type }));
              dispatch(changeSortType(type));
            }}
            className={cn('catalog-sort__type-button', {
              'catalog-sort__type-button--active': sortType === type,
            })}
            aria-label={label}
            key={type}>
            {label}
          </button>
        ))}
      </div>
      <div className="catalog-sort__order">
        <button
          onClick={() => {
            dispatch(fetchGuitarsAction({ sortType, orderType: OrderType.Asc }));
            dispatch(changeOrderType(OrderType.Asc));
          }}
          className={cn('catalog-sort__order-button', 'catalog-sort__order-button--up', {
            'catalog-sort__order-button--active': currentOrderType === OrderType.Asc,
          })}
          aria-label="По возрастанию"
        />
        <button
          onClick={() => {
            dispatch(fetchGuitarsAction({ sortType, orderType: OrderType.Desc }));
            dispatch(changeOrderType(OrderType.Desc));
          }}
          className={cn('catalog-sort__order-button', 'catalog-sort__order-button--down', {
            'catalog-sort__order-button--active': currentOrderType === OrderType.Desc,
          })}
          aria-label="По убыванию"
        />
      </div>
    </div>
  );
}

export default Sorting;
