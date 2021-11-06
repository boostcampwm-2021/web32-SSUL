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
  },
});

export const { setGroupData } = createGroupDataSlice.actions;
export default createGroupDataSlice.reducer;
