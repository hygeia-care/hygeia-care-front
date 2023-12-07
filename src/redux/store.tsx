import { configureStore } from '@reduxjs/toolkit';
import navigationReducer from './slices/navigationSlice';
import userReducer from './slices/userSlice'

export const store = configureStore({
  reducer: {
    navigation: navigationReducer,
    userReducer: userReducer,
    // otros reducers aquí si los tienes
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
