import { combineReducers } from '@reduxjs/toolkit';
import groupRecruit from './slices/groupRecruitFilterSlice';

const reducer = combineReducers({
  groupRecruit,
});

export type ReducerType = ReturnType<typeof reducer>;
export default reducer;
