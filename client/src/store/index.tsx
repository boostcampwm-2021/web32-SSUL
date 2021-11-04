import { configureStore } from '@reduxjs/toolkit';
import reducer from './rootReducer';

const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
