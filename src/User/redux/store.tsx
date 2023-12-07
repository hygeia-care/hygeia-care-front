import { configureStore } from '@reduxjs/toolkit';
import editUserReducer from './userSlice'

export const store = configureStore({
  reducer: {
    editUser: editUserReducer,
    // otros reducers aquí si los tienes
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
