import { createSlice } from '@reduxjs/toolkit';
import { GroupCreateDto } from '@types';
import { RootState } from '../index';

const INTIIAL_STATE: GroupCreateDto = {
  ownerId: 0,
  name: '',
  maxUserCnt: 1,
  curUserCnt: 1,
  intro: '',
  startAt: '',
  endAt: '',
  categoryId: 0,
  techStacks: [],
};

export const groupCreateDataSlice = createSlice({
  name: 'groupCreateData',
  initialState: { ...INTIIAL_STATE },
  reducers: {
    setGroupData(state, action) {
      const newData = action.payload;
      return { ...state, ...newData };
    },
    clearGroupData() {
      return { ...INTIIAL_STATE };
    },
  },
});

export const { setGroupData, clearGroupData } = groupCreateDataSlice.actions;
export default groupCreateDataSlice.reducer;
export const groupCreateDataState = (state: RootState): GroupCreateDto => state.createGroupData;
