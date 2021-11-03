import { combineReducers } from '@reduxjs/toolkit';
import techStackInput from './slices/techStackInput';

const reducer = combineReducers({
  techStackInput,
});

export type ReducerType = ReturnType<typeof reducer>;
export default reducer;
