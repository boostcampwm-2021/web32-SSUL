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
  isLogin: boolean;
}

const initialState: UserState = {
  id: 0,
  oAuthId: '',
  name: '',
  image: '',
  feverStack: 0,
  shareStack: 0,
  isLogin: false,
  role: UserType.MENTEE,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    initUser: () => initialState,
    setUser(state, { payload }) {
      return {
        ...state,
        ...payload,
        isLogin: true,
        role: payload.role ?? UserType.MENTEE,
      };
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
