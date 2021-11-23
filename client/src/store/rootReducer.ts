import { combineReducers } from '@reduxjs/toolkit';
import util from './util/Slice';
import user from './user/globalSlice';
import groupRecruit from './group/filterSlice';
import createGroupData from './group/makerSlice';
import groupDetail from './group/detailSlice';
import profileDataSlice from './user/profileSlice';
import groupCardDetail from './group/cardDetailSlice';
import post from './group/postSlice';

const reducer = combineReducers({
  util,
  user,
  createGroupData,
  groupRecruit,
  groupDetail,
  profileDataSlice,
  groupCardDetail,
  post,
});

export type ReducerType = ReturnType<typeof reducer>;
export default reducer;
