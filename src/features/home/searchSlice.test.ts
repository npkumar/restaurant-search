import { LocationsEntity } from 'api/autocomplete';
import { ShopsEntity } from 'api/search';
import { store } from 'app/store';

import {
  resetSearch,
  setDropdownOpen,
  setLocation,
  setLocations,
  setSearchTerm,
  setShop
} from './searchSlice';

const testLocation: LocationsEntity = {
  text: 'test',
  type: 'test',
  payload: {
    location_type: 'location_type',
    term: 'term',
    area: 'area',
    geo: {
      lat: 0,
      lon: 0
    }
  }
};

describe('searchSlice', () => {
  beforeEach(() => store.dispatch(resetSearch()));
  afterEach(() => store.dispatch(resetSearch()));

  describe('setDropdownOpen', () => {
    test('should set the dropdown open state', () => {
      const beforeStore = store.getState().search;
      expect(beforeStore.isDropdownOpen).toBe(false);
      store.dispatch(setDropdownOpen(true));
      const afterStore = store.getState().search;
      expect(afterStore.isDropdownOpen).toBe(true);
    });
  });

  describe('setSearchTerm', () => {
    test('should set the search term', () => {
      const beforeStore = store.getState().search;
      expect(beforeStore.searchTerm).toBe('');
      store.dispatch(setSearchTerm('test'));
      const afterStore = store.getState().search;
      expect(afterStore.searchTerm).toBe('test');
    });
  });

  describe('resetSearch', () => {
    test('it should reset the search state', () => {
      const beforeStore = store.getState().search;
      expect(beforeStore.searchTerm).toBe('');
      expect(beforeStore.isDropdownOpen).toBe(false);
      store.dispatch(setSearchTerm('test'));
      store.dispatch(setDropdownOpen(true));
      const afterStore = store.getState().search;
      expect(afterStore.searchTerm).toBe('test');
      expect(afterStore.isDropdownOpen).toBe(true);
      store.dispatch(resetSearch());
      const resetStore = store.getState().search;
      expect(resetStore.searchTerm).toBe('');
      expect(resetStore.isDropdownOpen).toBe(false);
    });
  });

  describe('setLocations', () => {
    const testLocations: LocationsEntity[] = [testLocation];
    test('it should set the locations', () => {
      const beforeStore = store.getState().search;
      expect(beforeStore.locations).toEqual([]);
      store.dispatch(setLocations(testLocations));
      const afterStore = store.getState().search;
      expect(afterStore.locations).toEqual(testLocations);
    });
  });

  describe('setLocation', () => {
    test('it should set the location', () => {
      const beforeStore = store.getState().search;
      expect(beforeStore.location).toBeNull();
      store.dispatch(setLocation(testLocation));
      const afterStore = store.getState().search;
      expect(afterStore.location).toEqual(testLocation);
    });
  });

  describe('setShop', () => {
    const testShop: Partial<ShopsEntity> = {
      location_kana_name: 'location_kana_name',
      cuisines: ['cuisines']
    };
    test('it should set the shop', () => {
      const beforeStore = store.getState().search;
      expect(beforeStore.shop).toBeNull();
      store.dispatch(setShop(testShop as ShopsEntity));
      const afterStore = store.getState().search;
      expect(afterStore.shop).toEqual(testShop);
    });
  });
});
