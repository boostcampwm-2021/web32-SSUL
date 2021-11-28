import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../index';

export enum ModalType {
  NONE = 'NONE',
  READ = 'READ',
  POST = 'POST',
  GROUP_DETAIL = 'GROUP_DETAIL',
  MENTOR_DETAIL = 'MENTOR_DETAIL',
}

export interface UtilState {
  isLoading: boolean;
  groupModalState: ModalType;
}

const initialState: UtilState = {
  isLoading: false,
  groupModalState: ModalType.NONE,
};

export const utilSlice = createSlice({
  name: 'util',
  initialState,
  reducers: {
    setLoadingState(state, { payload }) {
      return { ...state, isLoading: payload };
    },
    changeGroupModalState(state, { payload }) {
      return { ...state, groupModalState: payload };
    },
  },
});

export const { changeGroupModalState, setLoadingState } = utilSlice.actions;
export default utilSlice.reducer;
export const selectLoadingState = (state: RootState): boolean => state.util.isLoading;
export const selectGroupModalState = (state: RootState): ModalType => state.util.groupModalState;
