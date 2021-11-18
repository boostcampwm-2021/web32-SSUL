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

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    role: UserType.MENTEE,
    isLogin: false,
  } as UserState,
  reducers: {
    initUser(state) {
      return {
        ...state,
        id: 0,
        oAuthId: '',
        name: '',
        image: '',
        feverStack: 0,
        shareStack: 0,
        isLogin: false,
      };
    },
    setUser(state, action) {
      const { id, oAuthId, name, image, feverStack, shareStack, role } = action.payload;
      return {
        ...state,
        id,
        oAuthId,
        name,
        image,
        feverStack,
        shareStack,
        isLogin: true,
        role: role ?? UserType.MENTEE,
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
