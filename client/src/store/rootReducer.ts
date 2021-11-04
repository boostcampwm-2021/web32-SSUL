import { combineReducers } from '@reduxjs/toolkit';
import groupTechStack from './slices/groupTechStackList';

const reducer = combineReducers({
  groupTechStack,
});

export type ReducerType = ReturnType<typeof reducer>;
export default reducer;
