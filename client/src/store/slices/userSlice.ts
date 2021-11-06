import { createSlice } from '@reduxjs/toolkit';
// import { RootState } from '../index';

enum UserType {
  MENTI = 'MENTI',
  MENTOR = 'MENTOR',
}

export interface UserState {
  id: string;
  name: string;
  image: string;
  type: UserType;
}

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: '',
    name: '',
    image: '',
    type: UserType.MENTI,
  } as UserState,
  reducers: {},
});

export default userSlice.reducer;
// export const returnGroupRecruitFilterState = (state: RootState): groupRecruitType =>
//   state.groupRecruit;
