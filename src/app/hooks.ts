import { AnyAction, Dispatch, ThunkDispatch } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { SearchState } from 'features/home/searchSlice';

import { RootState, AppDispatch } from './store';

export const useAppDispatch: () => ThunkDispatch<
  {
    search: SearchState;
  },
  undefined,
  AnyAction
> &
  Dispatch<AnyAction> = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useSearchAppSelector = (): SearchState =>
  useAppSelector((state) => state.search);
