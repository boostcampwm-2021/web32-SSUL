import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../index';

interface MentorCardDetail {
  mentorId: number;
}

const INTIIAL_STATE = {} as MentorCardDetail;

export const mentorCardDetailSlice = createSlice({
  name: 'mentorCardDetail',
  initialState: { ...INTIIAL_STATE },
  reducers: {
    setMentorCardDetail(state, { payload }) {
      return { ...state, mentorId: payload };
    },
    clearMentorCardDetail() {
      return { ...INTIIAL_STATE };
    },
  },
});

export const { setMentorCardDetail, clearMentorCardDetail } = mentorCardDetailSlice.actions;
export default mentorCardDetailSlice.reducer;
export const mentorCardDetailState = (state: RootState): MentorCardDetail => state.mentorCardDetail;
