import { createSlice } from '@reduxjs/toolkit';
import { GroupData } from '../../types/CreateGroup';

export const createGroupInfoSlice = createSlice({
  name: 'createGroupInfo',
  initialState: {
    category: '',
    personnelCount: 1,
    startDate: '',
    endDate: '',
    groupName: '',
    groupInfo: '',
    techStack: [],
  } as GroupData,
  reducers: {
    setGroupData(state, action) {
      const newData = action.payload;
      return { ...state, ...newData };
    },
  },
});

export const { setGroupData } = createGroupInfoSlice.actions;
export default createGroupInfoSlice.reducer;
