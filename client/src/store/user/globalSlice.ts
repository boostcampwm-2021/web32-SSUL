import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { MentorOrMentee } from '@constants/enums';

export interface UserState {
  id?: number;
  oAuthId?: string;
  name?: string;
  image?: string;
  feverStack?: number;
  shareStack?: number;
  role: MentorOrMentee;
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
  role: MentorOrMentee.MENTEE,
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
        role: payload.role ?? MentorOrMentee.MENTEE,
      };
    },
    changeUserRole(state) {
      const role =
        state.role == MentorOrMentee.MENTEE ? MentorOrMentee.MENTOR : MentorOrMentee.MENTEE;
      return { ...state, role };
    },
  },
});

export const { initUser, setUser, changeUserRole } = userSlice.actions;
export default userSlice.reducer;
export const selectUser = (state: RootState): UserState => state.user;
export const selectUserRole = (state: RootState): MentorOrMentee => state.user.role;
