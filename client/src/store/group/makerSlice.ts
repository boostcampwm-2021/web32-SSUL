import { createSlice } from '@reduxjs/toolkit';
import { GroupCreateInterface } from '@types';
import { RootState } from '../index';

const INTIIAL_STATE = {
  ownerId: 0,
  name: '',
  maxUserCnt: 1,
  curUserCnt: 1,
  intro: '',
  startAt: '',
  endAt: '',
  category: '',
  usingTechStacks: [],
} as GroupCreateInterface;

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
export const groupCreateDataState = (state: RootState): GroupCreateInterface =>
  state.createGroupData;
