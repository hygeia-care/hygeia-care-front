import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: 'editUser',
  initialState: { user: null },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
export const selectUser = (state: any) => state.editUser.user;