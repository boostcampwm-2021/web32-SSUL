import { combineReducers } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import groupRecruit from './slices/groupRecruitFilterSlice';
import createGroupData from './slices/createGroupData';

const reducer = combineReducers({
  userSlice,
  createGroupData,
  groupRecruit,
});

export type ReducerType = ReturnType<typeof reducer>;
export default reducer;
