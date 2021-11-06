import { combineReducers } from '@reduxjs/toolkit';
import groupRecruit from './slices/groupRecruitFilterSlice';
import createGroupData from './slices/createGroupData';

const reducer = combineReducers({
  createGroupData,
  groupRecruit,
});

export type ReducerType = ReturnType<typeof reducer>;
export default reducer;
