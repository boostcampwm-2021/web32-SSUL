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
    categoryId: 0,
    name: '',
    maxUserCnt: 0,
    curUserCnt: 0,
    intro: '',
    startAt: null,
    endAt: null,
    status: '',
    category: '',
    techStackList: [],
    ownerName: '',
    ownerAvatarUrl: '',
    ownerGithubId: '',
  },
  techStacks: [{ techStackId: 0, name: '' }],
  groupEnrollments: [{ userId: 0, githubId: '', name: '', avatarUrl: '', type: '' }],
};

export const detailSlice = createSlice({
  name: 'groupDetail',
  initialState,
  reducers: {
    setGroupDetail(state, { payload }) {
      const { techStacks, groupEnrollments } = payload;
      delete payload['techStacks'];
      delete payload['groupEnrollments'];
      const detail = { ...payload };
      return { ...state, detail, techStacks, groupEnrollments };
    },
  },
});

export const { setGroupDetail } = detailSlice.actions;
export default detailSlice.reducer;
export const selectGroupDetail = (state: RootState): GroupDetail => state.groupDetail.detail;
export const selectGroupTechStack = (state: RootState): GroupUsingTechStack[] =>
  state.groupDetail.techStacks;
export const selectGroupEnrollment = (state: RootState): GroupEnrollment[] =>
  state.groupDetail.groupEnrollments;
