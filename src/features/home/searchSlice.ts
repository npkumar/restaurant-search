import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { LocationsEntity } from 'api/autocomplete';
import { ShopsEntity } from 'api/search';

export interface SearchState {
  isDropdownOpen: boolean;
  searchTerm?: string;
  locations?: LocationsEntity[];
  location?: LocationsEntity | null;
  shops?: ShopsEntity[] | null;
  shop?: ShopsEntity | null;
}

export const initialState: SearchState = {
  locations: [],
  isDropdownOpen: false,
  searchTerm: ''
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setLocations: (state, action: PayloadAction<LocationsEntity[]>) => {
      state.locations = action.payload;

      if (state.locations.length > 0) {
        state.isDropdownOpen = true;
      } else {
        state.isDropdownOpen = false;
      }
    },
    setDropdownOpen: (state, action: PayloadAction<boolean>) => {
      state.isDropdownOpen = action.payload;
    },
    setSearchTerm: (
      state,
      action: PayloadAction<SearchState['searchTerm']>
    ) => {
      state.searchTerm = action.payload;
      state.isDropdownOpen = false;
    },
    setLocation: (state, action: PayloadAction<LocationsEntity>) => {
      state.searchTerm = action.payload.text;
      state.location = action.payload;
      state.isDropdownOpen = false;
    },
    setShop: (state, action: PayloadAction<ShopsEntity>) => {
      state.shop = action.payload;
    }
  }
});

export const {
  setSearchTerm,
  setLocations,
  setDropdownOpen,
  setLocation,
  setShop
} = searchSlice.actions;

export const searchReducer = searchSlice.reducer;
