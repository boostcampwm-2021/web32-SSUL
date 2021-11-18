import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { GroupDetail, GroupUsingTechStack, GroupEnrollment } from '@types';

export interface GroupDetailState {
  detail?: GroupDetail;
  usingTechStack?: GroupUsingTechStack[];
  groupEnrollment?: GroupEnrollment[];
}

const initialState = {
  detail: null,
  usingTechStack: null,
  groupEnrollment: null,
};

export const detailSlice = createSlice({
  name: 'groupDetail',
  initialState,
  reducers: {},
});

export default detailSlice.reducer;
