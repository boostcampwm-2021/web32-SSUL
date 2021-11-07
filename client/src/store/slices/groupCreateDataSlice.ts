import { createSlice } from '@reduxjs/toolkit';
import { GroupCreateInterface } from '@types';
import { RootState } from '../index';

export const groupCreateDataSlice = createSlice({
  name: 'groupCreateData',
  initialState: {
    ownerId: 0,
    name: '',
    maxUserCnt: 1,
    curUserCnt: 1,
    intro: '',
    startAt: '',
    endAt: '',
    category: '',
    usingTechStacks: [],
  } as GroupCreateInterface,
  reducers: {
    setGroupData(state, action) {
      const newData = action.payload;
      return { ...state, ...newData };
    },
    clearGroupData() {
      const clearState: GroupCreateInterface = {
        ownerId: 0,
        name: '',
        maxUserCnt: 1,
        curUserCnt: 1,
        intro: '',
        startAt: '',
        endAt: '',
        category: '',
        usingTechStacks: [],
      } 
      return { ...clearState };
    },
  },
});

export const { setGroupData, clearGroupData } = groupCreateDataSlice.actions;
export default groupCreateDataSlice.reducer;
export const groupCreateDataState = (state: RootState): GroupCreateInterface => state.createGroupData;
