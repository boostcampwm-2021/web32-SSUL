import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../index';

export interface mentorRecruitType {
  techStackInput: string;
  mentorNameInput: string;
  selectedTechStack: string[];
  filterdQuery: string;
  selectedPage: number;
}

const initialState = {
  techStackInput: '',
  mentorNameInput: '',
  selectedTechStack: [],
  filterdQuery: '',
  selectedPage: 1,
} as mentorRecruitType;

export const mentorRecruitFilterSlice = createSlice({
  name: 'mentorRecruit',
  initialState,
  reducers: {
    initFilterState() {
      return { ...initialState };
    },
    changeTechStackInput(state, { payload }) {
      return { ...state, techStackInput: payload };
    },
    changeMentorNameInput(state, { payload }) {
      return { ...state, mentorNameInput: payload };
    },
    pushSelectedTechStack(state, { payload }) {
      const nextTechStack: string = payload;
      const nowSelectedTechStackList: string[] = state.selectedTechStack;
      if (!nowSelectedTechStackList.includes(nextTechStack))
        return {
          ...state,
          selectedTechStack: [...nowSelectedTechStackList, nextTechStack],
          selectedPage: 1,
        };
    },
    popSelectedTechStack(state, { payload }) {
      const popTechStack: string = payload;
      const newSelectedTechStackList = state.selectedTechStack.filter(
        (techStack) => techStack !== popTechStack,
      );
      return { ...state, selectedTechStack: newSelectedTechStackList, selectedPage: 1 };
    },
    checkPageNumber(state, { payload }) {
      return { ...state, selectedPage: payload };
    },
    createdFilterdQuery(state) {
      const { mentorNameInput, selectedTechStack, selectedPage } = state;
      const pageQuery = `?page=${selectedPage}`;
      const nameQuery = mentorNameInput ? `&name=${encodeURIComponent(mentorNameInput)}` : '';
      const techStackQuery =
        selectedTechStack.length !== 0
          ? `&techstack=${encodeURIComponent(selectedTechStack.join(','))}`
          : '';
      return {
        ...state,
        filterdQuery: `${pageQuery}${nameQuery}${techStackQuery}`,
      };
    },
  },
});

export const {
  changeTechStackInput,
  pushSelectedTechStack,
  popSelectedTechStack,
  changeMentorNameInput,
  createdFilterdQuery,
  initFilterState,
  checkPageNumber,
} = mentorRecruitFilterSlice.actions;
export default mentorRecruitFilterSlice.reducer;
export const returnMentorRecruitFilterState = (state: RootState): mentorRecruitType =>
  state.mentorRecruit;
