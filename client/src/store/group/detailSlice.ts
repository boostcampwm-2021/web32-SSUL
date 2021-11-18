import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { GroupDetail, GroupUsingTechStack, GroupEnrollment } from '@types';

export interface GroupDetailState {
  detail: GroupDetail;
  usingTechStack: GroupUsingTechStack[];
  groupEnrollment: GroupEnrollment[];
}

const initialState = {
  detail: {
    id: 0,
    mentorId: 0,
    ownerId: 0,
    name: '',
    maxUserCnt: 0,
    curUserCnt: 0,
    intro: '',
    startAt: null,
    endAt: null,
    status: '',
  },
  usingTechStack: [{ techStackId: 0, name: '' }],
  groupEnrollment: [{ userId: 0, githubId: '', name: '', avatarUrl: '' }],
};

export const detailSlice = createSlice({
  name: 'groupDetail',
  initialState,
  reducers: {
    setGroupDetail(state, { payload }) {
      const { usingTechStacks: usingTechStack, groupEnrollments: groupEnrollment } = payload;
      delete payload['usingTechStacks'];
      delete payload['groupEnrollments'];
      const detail = payload;
      return { ...state, detail, usingTechStack, groupEnrollment };
    },
  },
});

export const { setGroupDetail } = detailSlice.actions;
export default detailSlice.reducer;
export const selectGroupDetail = (state: RootState): GroupDetail => state.groupDetail.detail;
export const selectGroupTechStack = (state: RootState): GroupUsingTechStack[] =>
  state.groupDetail.usingTechStack;
export const selectGroupEnrollment = (state: RootState): GroupEnrollment[] =>
  state.groupDetail.groupEnrollment;
