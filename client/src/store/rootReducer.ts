import { combineReducers } from '@reduxjs/toolkit';
import groupRecruit from './slices/groupRecruitFilterSlice';
import createGroupInfo from './slices/createGroupInfo';

const reducer = combineReducers({
  groupRecruit,
  createGroupInfo
});

export type ReducerType = ReturnType<typeof reducer>;
export default reducer;
