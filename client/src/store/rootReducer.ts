import { combineReducers } from '@reduxjs/toolkit';
import groupRecruit from './slices/groupRecruitSlice';

const reducer = combineReducers({
  groupRecruit,
});

export type ReducerType = ReturnType<typeof reducer>;
export default reducer;
