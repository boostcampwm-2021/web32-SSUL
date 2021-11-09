import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../index';

enum UserType {
  MENTEE = 'MENTEE',
  MENTOR = 'MENTOR',
}

export interface UserState {
  id?: number;
  oAuthId?: string;
  name?: string;
  image?: string;
  feverStack?: number;
  shareStack?: number;
  role: UserType;
}

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    role: UserType.MENTEE,
  } as UserState,
  reducers: {
    initUser(state) {
      return { ...state, id: 0, oAuthId: '', name: '', image: '', feverStack: 0, shareStack: 0 };
    },
    setUser(state, action) {
      const { id, oAuthId, name, image, feverStack, shareStack } = action.payload;
      return { ...state, id, oAuthId, name, image, feverStack, shareStack };
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
