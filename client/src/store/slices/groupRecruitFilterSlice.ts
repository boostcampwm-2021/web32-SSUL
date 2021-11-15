import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../index';

export interface groupRecruitType {
  techStackInput: string;
  groupNameInput: string;
  selectedTechStack: string[];
  selectedCategoryId: number;
  filterdQuery: string;
}

const initialState = {
  techStackInput: '',
  groupNameInput: '',
  selectedTechStack: [],
  selectedCategoryId: 0,
  filterdQuery: '',
} as groupRecruitType;

export const groupRecruitFilterSlice = createSlice({
  name: 'groupRecruit',
  initialState,
  reducers: {
    initFilterState() {
      return { ...initialState };
    },
    changeTechStackInput(state, { payload }) {
      return { ...state, techStackInput: payload };
    },
    changeGroupNameInput(state, { payload }) {
      return { ...state, groupNameInput: payload };
    },
    pushSelectedTechStack(state, { payload }) {
      const nextTechStack: string = payload;
      const nowSelectedTechStackList: string[] = state.selectedTechStack;
      if (!nowSelectedTechStackList.includes(nextTechStack))
        return { ...state, selectedTechStack: [...nowSelectedTechStackList, nextTechStack] };
    },
    popSelectedTechStack(state, { payload }) {
      const popTechStack: string = payload;
      const newSelectedTechStackList = state.selectedTechStack.filter(
        (techStack) => techStack !== popTechStack,
      );
      return { ...state, selectedTechStack: newSelectedTechStackList };
    },
    checkCategory(state, { payload }) {
      return { ...state, selectedCategoryId: payload };
    },
    createdFilterdQuery(state) {
      const { groupNameInput, selectedCategoryId, selectedTechStack } = state;
      const nameQuery = groupNameInput ? `&name=${groupNameInput}` : '';
      const categoryQuery = selectedCategoryId ? `&category=${selectedCategoryId}` : '';
      const techStackQuery =
        selectedTechStack.length !== 0 ? `&techstack=${selectedTechStack.join(',')}` : '';
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
  initFilterState,
} = groupRecruitFilterSlice.actions;
export default groupRecruitFilterSlice.reducer;
export const returnGroupRecruitFilterState = (state: RootState): groupRecruitType =>
  state.groupRecruit;
