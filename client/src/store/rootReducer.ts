import { combineReducers } from '@reduxjs/toolkit';
import util from './slices/utilSlice';
import user from './slices/userSlice';
import groupRecruit from './slices/groupRecruitFilterSlice';
import createGroupData from './slices/groupCreateDataSlice';
import profileDataSlice from './slices/profileDataSlice';

const reducer = combineReducers({
  util,
  user,
  createGroupData,
  groupRecruit,
  profileDataSlice,
});

export type ReducerType = ReturnType<typeof reducer>;
export default reducer;
