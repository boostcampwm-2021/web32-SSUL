import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../index';

enum UserType {
  MENTEE = 'MENTEE',
  MENTOR = 'MENTOR',
}

export interface UserState {
  id: string;
  name: string;
  image: string;
  role: UserType;
}

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: '',
    name: '',
    image: '',
    role: UserType.MENTEE,
  } as UserState,
  reducers: {
    initUser(state) {
      return { ...state, id: '', name: '', image: '' };
    },
    setUser(state, action) {
      const { id, name, image } = action.payload;
      return { ...state, id, name, image };
    },
    changeUserRole(state) {
      const role = state.role == UserType.MENTEE ? UserType.MENTOR : UserType.MENTEE;
      return { ...state, role };
    },
  },
});

export const { initUser, setUser, changeUserRole } = userSlice.actions;
export default userSlice.reducer;
export const selectUser = (state: RootState): UserState => state.user;
export const selectUserRole = (state: RootState): UserType => state.user.role;
