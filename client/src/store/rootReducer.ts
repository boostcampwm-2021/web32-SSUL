import { combineReducers } from '@reduxjs/toolkit';
import util from './slices/utilSlice';
import user from './slices/userSlice';
import groupRecruit from './slices/groupRecruitFilterSlice';
import createGroupData from './slices/groupCreateDataSlice';

const reducer = combineReducers({
  util,
  user,
  createGroupData,
  groupRecruit,
});

export type ReducerType = ReturnType<typeof reducer>;
export default reducer;
