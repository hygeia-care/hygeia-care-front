import { configureStore } from '@reduxjs/toolkit';
import navigationReducer from './slices/navigationSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    navigation: navigationReducer,
    auth: authReducer,
    // otros reducers aquí si los tienes
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
