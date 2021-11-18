import { combineReducers } from '@reduxjs/toolkit';
import util from './util/Slice';
import user from './user/globalSlice';
import groupRecruit from './group/filterSlice';
import createGroupData from './group/makerSlice';
import profileDataSlice from './user/profileSlice';

const reducer = combineReducers({
  util,
  user,
  createGroupData,
  groupRecruit,
  profileDataSlice,
});

export type ReducerType = ReturnType<typeof reducer>;
export default reducer;
