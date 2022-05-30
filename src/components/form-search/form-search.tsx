import { ChangeEvent, useState, useTransition } from 'react';
import cn from 'classnames';

import { useAppSelector } from '../../hooks/hooks';
import { selectFilteredGuitars } from '../../store/guitars-slice/guitars-slice';

import { filteredBySearch } from '../../utils/utils';

import styles from './form-search.module.css';

function FormSearch(): JSX.Element {
  const [, startTransition] = useTransition();
  const [search, setSearch] = useState<string>('');
  const products = useAppSelector(selectFilteredGuitars);

  const filteredProducts = filteredBySearch(products, search);
  const isSearchEmpty = search.length === 0;
  const isEmpty = filteredProducts.length === 0;

  const handleSearchChange = (evt: ChangeEvent<HTMLInputElement>) => {
    startTransition(() => {
      setSearch(evt.target.value);
    });
  };

  return (
    <div className="form-search">
      <form className="form-search__form" id="form-search" onSubmit={(evt) => evt.preventDefault()}>
        <button className="form-search__submit" type="submit">
          <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
            <use xlinkHref="#icon-search"></use>
          </svg>
          <span className="visually-hidden">Начать поиск</span>
        </button>
        <input
          onChange={handleSearchChange}
          className="form-search__input"
          id="search"
          type="text"
          autoComplete="off"
          placeholder="что вы ищите?"
        />
        <label className="visually-hidden" htmlFor="search">
          Поиск
        </label>
      </form>
      <ul className={cn('form-search__select-list', { hidden: isSearchEmpty })}>
        {!isEmpty ? (
          filteredProducts.map(({ name, id }) => (
            <li className="form-search__select-item" tabIndex={0} key={id}>
              {name}
            </li>
          ))
        ) : (
          <li className="form-search__select-item">Совпадений не найдено</li>
        )}
      </ul>
      <button
        onClick={() => setSearch('')}
        className={cn('form-search__reset', { [styles['show']]: !isSearchEmpty })}
        type="reset"
        form="form-search">
        <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
        <span className="visually-hidden">Сбросить поиск</span>
      </button>
    </div>
  );
}

export default FormSearch;
