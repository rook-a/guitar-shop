import {
  checkIsFull,
  adaptTypeToClient,
  formatDate,
  priceWithSpace,
  createQueryByPage,
  createQueryBySort,
  createQueryByFilter,
  createQuery,
} from './utils';
import { GuitarTypeFromTheServer, GuitarTypeForClient } from './const';

describe('Utils functions', () => {
  describe('check function checkIsFull', () => {
    it('function return correct answer when rating >= number', () => {
      expect(checkIsFull(4, 3)).toBe('#icon-full-star');
    });

    it('function return correct answer when rating < number', () => {
      expect(checkIsFull(1, 5)).toBe('#icon-star');
    });
  });

  describe('check function adaptTypeToClient', () => {
    it('function return correct answer', () => {
      expect(adaptTypeToClient(GuitarTypeFromTheServer.Ukulele)).toBe(GuitarTypeForClient.Ukulele);
    });

    it('function return default answer when type unknown', () => {
      expect(adaptTypeToClient('unknown')).toBe(GuitarTypeForClient.Unknown);
    });
  });

  describe('check function formatDate', () => {
    it('function return formated date', () => {
      expect(formatDate('2022-03-21T10:56:01.590Z')).toBe('21 марта');
    });

    it('function return correct answer when date incorrect', () => {
      expect(formatDate('bla-bla-bla')).toBe('Дата неизвестна');
    });
  });

  describe('check function priceWithSpace', () => {
    it('function return correct price with space', () => {
      expect(priceWithSpace(100000)).toBe('100 000');
    });
  });

  describe('check function createQueryByPage', () => {
    it('function return correct query string to pagination limit', () => {
      expect(createQueryByPage(1)).toBe('_end=9&_start=0');
    });
  });

  describe('check function createQueryBySort', () => {
    it('function return correct query string', () => {
      expect(createQueryBySort('rating', 'asc')).toBe('_order=asc&_sort=rating');
    });
  });

  describe('check function createQueryByFilter', () => {
    it('function return correct query string', () => {
      expect(createQueryByFilter('1', '2', ['ukulele'], ['4'])).toBe(
        'price_gte=1&price_lte=2&stringCount=4&type=ukulele',
      );
    });
  });

  describe('check function createQuery', () => {
    it('', () => {
      const fakeParams = {
        activePageNumber: 1,
        sortType: 'price',
        orderType: 'desc',
        min: '1',
        max: '2',
        guitarType: ['ukulele'],
        stringCount: ['4'],
      };

      expect(createQuery(fakeParams)).toBe(
        '_end=9&_start=0&_order=desc&_sort=price&price_gte=1&price_lte=2&stringCount=4&type=ukulele',
      );
    });
  });
});
