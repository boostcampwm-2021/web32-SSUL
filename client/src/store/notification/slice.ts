import { createSlice } from '@reduxjs/toolkit';
import { Notification } from '@types';
import { RootState } from '../index';

interface NotificationState {
  notificationList: Notification[];
}
export const notificationSlice = createSlice({
  name: 'notificationList',
  initialState: { notificationList: [] } as NotificationState,
  reducers: {
    setNotificationList(state, action) {
      const newData = action.payload;
      return { ...state, ...newData };
    },
  },
});
``;
export const { setNotificationList } = notificationSlice.actions;
export default notificationSlice.reducer;
export const selectNotficationList = (state: RootState): NotificationState =>
  state.notificationSlice;
