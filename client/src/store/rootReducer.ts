import { combineReducers } from '@reduxjs/toolkit';
import techStackInput from './slices/techStackInput';
import selectedTechStack from './slices/selectedTechStack';

const reducer = combineReducers({
  techStackInput,
  selectedTechStack,
});

export type ReducerType = ReturnType<typeof reducer>;
export default reducer;
