import { createSlice } from '@reduxjs/toolkit';
import { GroupData } from '../../types/CreateGroup';

export const createGroupDataSlice = createSlice({
  name: 'createGroupData',
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

export const { setGroupData, clearGroupData } = createGroupDataSlice.actions;
export default createGroupDataSlice.reducer;
