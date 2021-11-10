import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../index';

export interface groupRecruitType {
  techStackInput: string;
  groupNameInput: string;
  selectedTechStack: string[];
  selectedCategory: string;
  filterdQuery: string;
}

export const groupRecruitFilterSlice = createSlice({
  name: 'groupRecruit',
  initialState: {
    techStackInput: '',
    groupNameInput: '',
    selectedTechStack: [],
    selectedCategory: '',
    filterdQuery: '',
  } as groupRecruitType,
  reducers: {
    changeTechStackInput(state, action) {
      return { ...state, techStackInput: action.payload };
    },
    changeGroupNameInput(state, action) {
      return { ...state, groupNameInput: action.payload };
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
    checkCategory(state, action) {
      return { ...state, selectedCategory: action.payload };
    },
    createdFilterdQuery(state) {
      const { groupNameInput, selectedCategory, selectedTechStack } = state;
      const nameQuery = groupNameInput ? `&name=${groupNameInput}` : '';
      const categoryQuery = selectedCategory ? `&category=${selectedCategory}` : '';
      const techStackQuery =
        selectedTechStack.length > 0 ? `&techstack=${selectedTechStack.join(',')}` : '';
      return { ...state, filterdQuery: `?${nameQuery}${categoryQuery}${techStackQuery}` };
    },
  },
});

export const {
  changeTechStackInput,
  pushSelectedTechStack,
  popSelectedTechStack,
  checkCategory,
  changeGroupNameInput,
  createdFilterdQuery,
} = groupRecruitFilterSlice.actions;
export default groupRecruitFilterSlice.reducer;
export const returnGroupRecruitFilterState = (state: RootState): groupRecruitType =>
  state.groupRecruit;
