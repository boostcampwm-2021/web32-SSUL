import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../index';

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
  reducers: {
    setUser(state, action) {
      const { id, name, image } = action.payload;
      return { ...state, id, name, image };
    },
    changeUserType(state) {
      const type = state.type == UserType.MENTI ? UserType.MENTOR : UserType.MENTI;
      return { ...state, type };
    },
  },
});

export const { setUser, changeUserType } = userSlice.actions;
export default userSlice.reducer;
export const selectUser = (state: RootState): UserState => state.user;
