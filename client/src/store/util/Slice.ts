import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { ModalTypeEnum } from '@constants/enums';

export interface UtilState {
  isLoading: boolean;
  groupModalState: ModalTypeEnum;
}

const initialState: UtilState = {
  isLoading: false,
  groupModalState: ModalTypeEnum.NONE,
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
export const selectGroupModalState = (state: RootState): ModalTypeEnum =>
  state.util.groupModalState;
