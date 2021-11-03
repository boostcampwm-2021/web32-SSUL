import { createSlice } from '@reduxjs/toolkit';

export const techStackInputSlice = createSlice({
  name: 'techStackInput',
  initialState: '' as string,
  reducers: {
    changeTechStackInput(state, action) {
      return action.payload;
    },
  },
});

export const { changeTechStackInput } = techStackInputSlice.actions;
export default techStackInputSlice.reducer;
