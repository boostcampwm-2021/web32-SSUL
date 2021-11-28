import { combineReducers } from '@reduxjs/toolkit';
import util from './util/Slice';
import user from './user/globalSlice';
import groupRecruit from './group/filterSlice';
import createGroupData from './group/makerSlice';
import groupDetail from './group/detailSlice';
import profileDataSlice from './user/profileSlice';
import groupCardDetail from './group/cardDetailSlice';
import post from './group/postSlice';
import mentorRecruit from './mentor/filterSlice';
import groupAdminDataSlice from './group/adminSlice';
import mentorCardDetail from './mentor/cardDetailSlice';

const reducer = combineReducers({
  util,
  user,
  createGroupData,
  groupRecruit,
  groupDetail,
  profileDataSlice,
  groupCardDetail,
  post,
  mentorRecruit,
  groupAdminDataSlice,
  mentorCardDetail,
});

export type ReducerType = ReturnType<typeof reducer>;
export default reducer;
