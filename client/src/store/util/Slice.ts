import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { ModalTypeEnum, ThemeModeEnum } from '@constants/enums';

export interface UtilState {
  isLoading: boolean;
  groupModalState: ModalTypeEnum;
  theme: ThemeModeEnum;
}

const initialState: UtilState = {
  isLoading: false,
  groupModalState: ModalTypeEnum.NONE,
  theme: ThemeModeEnum.LIGHT,
};

export const utilSlice = createSlice({
  name: 'util',
  initialState,
  reducers: {
    toggleTheme(state) {
      return {
        ...state,
        theme: state.theme === ThemeModeEnum.LIGHT ? ThemeModeEnum.DARK : ThemeModeEnum.LIGHT,
      };
    },
    setLoadingState(state, { payload }) {
      return { ...state, isLoading: payload };
    },
    changeGroupModalState(state, { payload }) {
      return { ...state, groupModalState: payload };
    },
  },
});

export const { toggleTheme, changeGroupModalState, setLoadingState } = utilSlice.actions;
export default utilSlice.reducer;
export const selectTheme = (state: RootState): ThemeModeEnum => state.util.theme;
export const selectLoadingState = (state: RootState): boolean => state.util.isLoading;
export const selectGroupModalState = (state: RootState): ModalTypeEnum =>
  state.util.groupModalState;
