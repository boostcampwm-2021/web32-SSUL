import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../index';

interface GroupActivity {
  name: string;
  startAt: string;
  endAt: string;
}

interface ProfileData {
  intro: string;
  techStacks: string[];
  groupActivitys: GroupActivity[];
}
const initialState: ProfileData = {
  intro: '',
  techStacks: [],
  groupActivitys: [],
};

export const profileDataSlice = createSlice({
  name: 'profileData',
  initialState: { ...initialState } as ProfileData,
  reducers: {
    setProfileData(state, action) {
      const newData = action.payload;
      return { ...state, ...newData };
    },
    clearProfileData() {
      return { ...initialState };
    },
  },
});

export const { setProfileData, clearProfileData } = profileDataSlice.actions;
export default profileDataSlice.reducer;
export const selectProfileData = (state: RootState): ProfileData => state.profileDataSlice;
