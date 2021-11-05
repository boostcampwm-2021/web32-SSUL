import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../index';

export interface groupRecruitType {
  techStackInput: string;
  selectedTechStack: string[];
}

export const groupRecruitSlice = createSlice({
  name: 'groupRecruit',
  initialState: {
    techStackInput: '' as string,
    selectedTechStack: [] as string[],
  },
  reducers: {
    changeTechStackInput(state, action) {
      return { ...state, techStackInput: action.payload };
    },
    pushSelectedTechStack(state, action) {
      const nextTechStack: string = action.payload;
      const nowSelectedTechStackList: string[] = state.selectedTechStack;
      if (!nowSelectedTechStackList.includes(nextTechStack))
        return { ...state, selectedTechStack: [...nowSelectedTechStackList, nextTechStack] };
    },
    popSelectedTechStack(state, action) {
      const popTechStack: string = action.payload;
      const newSelectedTechStackList = state.selectedTechStack.filter(
        (techStack) => techStack !== popTechStack,
      );
      return { ...state, selectedTechStack: newSelectedTechStackList };
    },
  },
});

export const { changeTechStackInput, pushSelectedTechStack, popSelectedTechStack } =
  groupRecruitSlice.actions;
export default groupRecruitSlice.reducer;
export const returnGroupRecruitState = (state: RootState): groupRecruitType => state.groupRecruit;
