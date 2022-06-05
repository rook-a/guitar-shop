import { ChangeEvent, useRef, useState, useTransition } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import cn from 'classnames';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchGuitarsSearch, selectGuitarsSearch } from '../../store/guitars-slice/guitars-slice';

import styles from './form-search.module.css';

function FormSearch(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [, startTransition] = useTransition();
  const [search, setSearch] = useState<string>('');
  const products = useAppSelector(selectGuitarsSearch);
  const inputSearch = useRef<HTMLInputElement | null>(null);

  const isSearchEmpty = search.length === 0;
  const isEmpty = products.length === 0;

  const handleSearchChange = (evt: ChangeEvent<HTMLInputElement>) => {
    startTransition(() => {
      dispatch(fetchGuitarsSearch(evt.target.value));
    });
    setSearch(evt.target.value);
  };

  const handleClick = (link: string): void => {
    if (inputSearch.current !== null) {
      inputSearch.current.value = '';
    }
    setSearch('');
    navigate(link);
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
          ref={inputSearch}
          defaultValue=""
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
          products.map(({ name, id }) => {
            const link = generatePath('/product/:id', { id: `${id}` });
            return (
              <li
                className="form-search__select-item"
                tabIndex={0}
                key={id}
                onClick={() => {
                  handleClick(link);
                }}
                onKeyDown={(evt) => {
                  if (evt.key === 'Enter') {
                    handleClick(link);
                  }
                }}>
                {name}
              </li>
            );
          })
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
