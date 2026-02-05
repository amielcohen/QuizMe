import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    user: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    login: (state, action) => {
      state.token = action.payload?.token ?? 'dummy-token';
      state.user = action.payload?.user ?? null;
      state.error = null;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.status = 'idle';
      state.error = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
