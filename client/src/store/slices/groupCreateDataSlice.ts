import { createSlice } from '@reduxjs/toolkit';
import { GroupData } from '../../types/CreateGroup';
import { RootState } from '../index';

export const groupCreateDataSlice = createSlice({
  name: 'groupCreateData',
  initialState: {
    category: '',
    personnelCount: 1,
    startDate: '',
    endDate: '',
    groupName: '',
    groupInfo: '',
    selectedTechStack: [],
  } as GroupData,
  reducers: {
    setGroupData(state, action) {
      const newData = action.payload;
      return { ...state, ...newData };
    },
    clearGroupData() {
      const clearState: GroupData = {
        category: '',
        personnelCount: 1,
        startDate: '',
        endDate: '',
        groupName: '',
        groupInfo: '',
        selectedTechStack: [],
      };
      return { ...clearState };
    },
  },
});

export const { setGroupData, clearGroupData } = groupCreateDataSlice.actions;
export default groupCreateDataSlice.reducer;
export const groupCreateDataState = (state: RootState): GroupData => state.createGroupData;
