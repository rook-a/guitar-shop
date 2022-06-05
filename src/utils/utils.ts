import qs from 'query-string';
import { GuitarTypeFromTheServer, GuitarTypeForClient, FAKE_ARRAY_LENGTH, MAX_NUMBER_OF_CARDS } from './const';
import { mockProduct } from './mock';
import { Query } from '../types/query';

export const stars = Array.from({ length: 5 }, (v, k) => k + 1);

export const mockProducts = Array.from({ length: FAKE_ARRAY_LENGTH }, () => mockProduct);

export const checkIsFull = (rating: number, number: number) => (rating >= number ? '#icon-full-star' : '#icon-star');

export const adaptTypeToClient = (type: string) => {
  switch (type) {
    case GuitarTypeFromTheServer.Acoustic:
      return GuitarTypeForClient.Acoustic;
    case GuitarTypeFromTheServer.Electric:
      return GuitarTypeForClient.Electric;
    case GuitarTypeFromTheServer.Ukulele:
      return GuitarTypeForClient.Ukulele;
    default:
      return GuitarTypeForClient.Unknown;
  }
};

export const formatDate = (date: string) => {
  if (isNaN(Date.parse(date))) {
    return 'Дата неизвестна';
  }

  return new Date(date).toLocaleString('ru', { month: 'long', day: 'numeric' });
};

export const priceWithSpace = (number: number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

const createQueryByPage = (activePageNumber?: number) => {
  const endLimit = activePageNumber ? activePageNumber * MAX_NUMBER_OF_CARDS : MAX_NUMBER_OF_CARDS;
  const startLimit = endLimit - MAX_NUMBER_OF_CARDS;

  return qs.stringify(
    {
      _start: startLimit,
      _end: endLimit,
    },
    { skipNull: true, skipEmptyString: true },
  );
};

const createQueryBySort = (sortType: string | undefined, orderType: string | undefined) => {
  return qs.stringify(
    {
      _sort: sortType,
      _order: orderType,
    },
    { skipNull: true, skipEmptyString: true },
  );
};

const createQueryByFilter = (
  min: string | undefined,
  max: string | undefined,
  guitarType: string[] | undefined,
  stringCount: number[] | undefined,
) => {
  return qs.stringify(
    {
      price_gte: min,
      price_lte: max,
      type: guitarType,
      stringCount,
    },
    { skipNull: true, skipEmptyString: true },
  );
};

export const createQuery = ({ activePageNumber, sortType, orderType, min, max, guitarType, stringCount }: Query) => {
  const page = createQueryByPage(activePageNumber);
  const sort = createQueryBySort(sortType, orderType);
  const filter = createQueryByFilter(min, max, guitarType, stringCount);

  return [page, sort, filter].filter((currentQuery) => currentQuery !== '').join('&');
};
