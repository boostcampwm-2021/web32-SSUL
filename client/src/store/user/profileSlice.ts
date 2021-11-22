import { createSlice } from '@reduxjs/toolkit';
import { GroupActivity, TechStack } from '@types';
import { RootState } from '../index';

interface ProfileData {
  intro: string;
  techStacks: TechStack[];
  groupActivitys: GroupActivity[];
  isMentor: boolean;
  mentorId: number;
  mentoringStack: TechStack[];
  feverStack: number;
  shareStack: number;
  userId: number;
  gitHubId: string;
  name: string;
  avatarUrl: string;
}
const initialState: ProfileData = {
  intro: '',
  techStacks: [],
  groupActivitys: [],
  isMentor: false,
  mentorId: -1,
  mentoringStack: [],
  feverStack: 0,
  shareStack: 0,
  userId: -1,
  gitHubId: '',
  name: '',
  avatarUrl: '',
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
