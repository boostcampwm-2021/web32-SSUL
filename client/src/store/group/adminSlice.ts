import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../index';

interface ParticipationRequest {
  profileImage: string;
  name: string;
  githubId: string;
  createdAt: string;
  feverStack: number;
}

interface GroupAdminState {
  name: string;
  intro: string;
  startAt: string;
  endAt: string;
  requestList: ParticipationRequest[];
}

const INTIIAL_STATE: GroupAdminState = {
  name: '',
  intro: '',
  startAt: '',
  endAt: '',
  requestList: [],
};

export const groupAdminDataSlice = createSlice({
  name: 'groupAdminData',
  initialState: { ...INTIIAL_STATE },
  reducers: {
    setGroupAdminData(state, action) {
      const newData = action.payload;
      return { ...state, ...newData };
    },
    clearGroupAdminData() {
      return { ...INTIIAL_STATE };
    },
  },
});

export const { setGroupAdminData, clearGroupAdminData } = groupAdminDataSlice.actions;
export default groupAdminDataSlice.reducer;
export const selectGroupAdminData = (state: RootState): GroupAdminState =>
  state.groupAdminDataSlice;
