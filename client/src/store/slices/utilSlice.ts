import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../index';

export interface UtilState {
  isLoading: boolean;
}
export const utilSlice = createSlice({
  name: 'util',
  initialState: {
    isLoading: false,
  } as UtilState,
  reducers: {
    toggleLoadingState(state) {
      return { ...state, isLoading: !state.isLoading };
    },
  },
});

export const { toggleLoadingState } = utilSlice.actions;
export default utilSlice.reducer;
export const selectLoadingState = (state: RootState): boolean => state.util.isLoading;
