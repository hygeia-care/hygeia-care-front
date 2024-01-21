// authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  isRegistrationSuccess: boolean;
}

const initialState: AuthState = {
  isRegistrationSuccess: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setRegistrationSuccess: (state: AuthState, action: PayloadAction<boolean>) => {
      state.isRegistrationSuccess = action.payload;
    },
  },
});

export const { setRegistrationSuccess } = authSlice.actions;
export default authSlice.reducer;
