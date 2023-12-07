import { configureStore } from '@reduxjs/toolkit';
import navigationReducer from './slices/navigationSlice';
import editUserReducer from './slices/editUserSlice'

export const store = configureStore({
  reducer: {
    navigation: navigationReducer,
    editUser: editUserReducer,
    // otros reducers aquí si los tienes
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
