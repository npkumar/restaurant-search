import { configureStore } from '@reduxjs/toolkit';

import { searchReducer } from 'features/home/searchSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer
  },
  devTools: process.env.NODE_ENV === 'development'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
