import { createSlice } from '@reduxjs/toolkit';

export const selectedTechStackSlice = createSlice({
  name: 'selectedTechStack',
  initialState: ['react', 'node.js'] as string[],
  reducers: {
    pushSelectedTechStack(state, action) {
      const nextTechStack: string = action.payload;
      if (!state.includes(nextTechStack)) return [...state, nextTechStack];
    },
    popSelectedTechStack(state, action) {
      const popTechStack: string = action.payload;
      return state.filter((techStack) => techStack !== popTechStack);
    },
  },
});

export const { pushSelectedTechStack, popSelectedTechStack } = selectedTechStackSlice.actions;
export default selectedTechStackSlice.reducer;
