import { configureStore } from '@reduxjs/toolkit';
import navigationReducer from './slices/navigationSlice';

export const store = configureStore({
  reducer: {
    navigation: navigationReducer,
    // otros reducers aquí si los tienes
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
