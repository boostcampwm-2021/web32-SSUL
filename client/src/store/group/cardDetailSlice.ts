import { createSlice } from '@reduxjs/toolkit';
import { GroupCardDetail } from '@types';
import { RootState } from '../index';

const INTIIAL_STATE = {} as GroupCardDetail;

export const groupCardDetailSlice = createSlice({
  name: 'groupCardDetail',
  initialState: { ...INTIIAL_STATE },
  reducers: {
    setGroupDetail(state, action) {
      const newData = action.payload;
      return { ...state, ...newData };
    },
    clearGroupDetail() {
      return { ...INTIIAL_STATE };
    },
  },
});

export const { setGroupDetail, clearGroupDetail } = groupCardDetailSlice.actions;
export default groupCardDetailSlice.reducer;
export const groupCardDetailState = (state: RootState): GroupCardDetail => state.groupCardDetail;
